<?php

namespace App\Http\Controllers;

use App\Models\BookEdition;
use App\Models\Lease;
use App\Http\Requests\StoreLeaseRequest;
use App\Http\Requests\UpdateLeaseRequest;
use Illuminate\Support\Facades\Log;

class LeaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lease $lease)
    {
        //
    }
}
