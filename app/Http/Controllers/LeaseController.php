<?php

namespace App\Http\Controllers;

use App\Models\BookEdition;
use App\Models\Lease;
use App\Http\Requests\StoreLeaseRequest;
use App\Http\Requests\UpdateLeaseRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\LeaseStatusUpdated;

class LeaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $statuses = ['requested', 'approved', 'collected', 'overdue', 'returned', 'cancelled'];
        $leasesByStatus = [];

        if ($user->role === 'client') {
            foreach ($statuses as $status) {
                $leasesByStatus[$status] = Lease::with(['bookCopy.bookEdition.book.author'])
                    ->where('client_id', $user->id)
                    ->where('status', $status)
                    ->latest()
                    ->paginate(10, ['*'], $status . '_page');
            }
            \Log::info('Client leases fetched', ['user_id' => $user->id]);
        } elseif ($user->role === 'librarian') {
            foreach ($statuses as $status) {
                $leasesByStatus[$status] = Lease::with(['bookCopy.bookEdition.book.author', 'client'])
                    ->where('status', $status)
                    ->latest()
                    ->paginate(10, ['*'], $status . '_page');
            }
        } else {
            \Log::warning('Unauthorized access to leases index', ['user_id' => $user->id]);
            abort(403);
        }

        return inertia('leases/index', [
            'leasesByStatus' => $leasesByStatus,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // app/Http/Controllers/LeaseController.php
    public function store(StoreLeaseRequest $request)
    {
        Log::info('Lease request initiated', [
            'client_id' => auth()->id(),
            'book_edition_id' => $request->book_edition_id,
        ]);

        $bookEdition = BookEdition::findOrFail($request->book_edition_id);

        $existingLease = Lease::where('client_id', auth()->id())
            ->whereHas('bookCopy', function ($q) use ($bookEdition) {
                $q->where('book_edition_id', $bookEdition->id);
            })
            ->whereIn('status', ['requested', 'approved', 'collected', 'overdue'])
            ->first();

        if ($existingLease) {
            Log::warning('User already has an active/requested lease for this book edition', [
                'client_id' => auth()->id(),
                'book_edition_id' => $bookEdition->id,
            ]);
            return back()->withErrors(['book' => 'You have already requested or leased this book edition.']);
        }

        $availableCopy = $bookEdition->bookCopies()
            ->whereDoesntHave('leases', function ($q) {
                $q->whereIn('status', ['requested', 'approved', 'collected', 'overdue']);
            })
            ->first();

        $copiesLeft = $bookEdition->bookCopies()->count();

        Log::info('Book edition checked', [
            'book_edition_id' => $bookEdition->id,
            'copies_left' => $copiesLeft,
            'available_copy_id' => $availableCopy ? $availableCopy->id : null,
        ]);

        if (!$availableCopy) {
            Log::warning('No available book copies for lease', [
                'book_edition_id' => $bookEdition->id,
                'copies_left' => $copiesLeft,
            ]);
            return back()->withErrors(['book' => 'No available book copies.']);
        }

        $leaseData = [
            'client_id' => auth()->id(),
            'librarian_id' => null,
            'book_copy_id' => $availableCopy->id,
            'lease_date' => now(),
            'status' => 'requested',
        ];

        Log::info('Creating lease', $leaseData);

        Lease::create($leaseData);

        Log::info('Lease created successfully', [
            'client_id' => auth()->id(),
            'book_edition_id' => $bookEdition->id,
            'book_copy_id' => $availableCopy->id,
        ]);


        return back()->with('success', 'Book requested successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Lease $lease)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lease $lease)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeaseRequest $request, Lease $lease)
    {
        $validated = $request->validated();
        $user = auth()->user();

        Log::info('Lease update attempt', [
            'user_id' => $user->id,
            'lease_id' => $lease->id,
            'requested_status' => $validated['status'] ?? null,
            'current_status' => $lease->status,
            'user_role' => $user->role,
        ]);

        if (isset($validated['status'])) {
            $allowedStatuses = ['cancelled', 'requested', 'approved', 'collected', 'overdue', 'returned'];
            if (!in_array($validated['status'], $allowedStatuses)) {
                Log::warning('Invalid status update attempted', [
                    'user_id' => $user->id,
                    'lease_id' => $lease->id,
                    'requested_status' => $validated['status'],
                ]);
                abort(400, 'Invalid status update.');
            }
            if ($user->role === 'client' && $lease->client_id === $user->id) {
                if (
                    ($validated['status'] === 'cancelled' && in_array($lease->status, ['requested', 'approved'])) ||
                    ($validated['status'] === 'requested' && $lease->status === 'cancelled')
                ) {
                    $lease->status = $validated['status'];
                    $lease->save();
                    Log::info('Lease status updated by client', [
                        'user_id' => $user->id,
                        'lease_id' => $lease->id,
                        'new_status' => $lease->status,
                    ]);
                    return back()->with('success', 'Lease status updated successfully.');
                }
                Log::warning('Unauthorized status transition by client', [
                    'user_id' => $user->id,
                    'lease_id' => $lease->id,
                    'requested_status' => $validated['status'],
                    'current_status' => $lease->status,
                ]);
                abort(403, 'Unauthorized status transition.');
            }
            if ($user->role === 'librarian') {
                $lease->status = $validated['status'];
                $lease->save();
                Log::info('Lease status updated by librarian', [
                    'user_id' => $user->id,
                    'lease_id' => $lease->id,
                    'new_status' => $lease->status,
                ]);

                if (isset($validated['status'])) {
                    $lease->status = $validated['status'];
                    $lease->save();

                    $lease->load([
                        'bookCopy.bookEdition.book.author',
                        'client',
                    ]);

                    Mail::to($lease->client->email)->send(new LeaseStatusUpdated($lease));

                    return back()->with('success', 'Lease status updated and notification sent.');
                }
            }
            Log::warning('Unauthorized lease update attempt', [
                'user_id' => $user->id,
                'lease_id' => $lease->id,
                'user_role' => $user->role,
            ]);
            abort(403, 'Unauthorized to update this lease.');
        }
        Log::warning('No valid status provided for lease update', [
            'user_id' => $user->id,
            'lease_id' => $lease->id,
        ]);
        abort(400, 'Invalid status update.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lease $lease)
    {
        //
    }
}
