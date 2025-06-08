<?php

namespace App\Http\Controllers;

use App\Models\BookEdition;
use App\Http\Requests\StoreBookEditionRequest;
use App\Http\Requests\UpdateBookEditionRequest;

class BookEditionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = \App\Models\BookEdition::with(['book.author', 'publisher'])->paginate(15);
        return \Inertia\Inertia::render('Books/Index', [
            'books' => $books,
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
    public function store(StoreBookEditionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(BookEdition $bookEdition)
    {
        $bookEdition->load(['book.author', 'publisher']);

        // Count available copies (not leased)
        $copies_left = $bookEdition->bookCopies()
            ->whereDoesntHave('leases', function ($q) {
                $q->whereNull('returned_at');
            })
            ->count();

        return \Inertia\Inertia::render('Books/Show', [
            'bookEdition' => $bookEdition,
            'copies_left' => $copies_left,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookEdition $bookEdition)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookEditionRequest $request, BookEdition $bookEdition)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookEdition $bookEdition)
    {
        //
    }

    public function requestCopy(BookEdition $bookEdition)
    {
        $copy = $bookEdition->bookCopies()
            ->whereDoesntHave('leases', function ($q) {
                $q->whereNull('returned_at');
            })
            ->first();

        if (!$copy) {
            return back()->withErrors(['No available copies.']);
        }

        $copy->leases()->create([
            'user_id' => auth()->id(),
            'leased_at' => now(),
            // add other fields as needed
        ]);

        return back()->with('success', 'Book requested successfully!');
    }
}
