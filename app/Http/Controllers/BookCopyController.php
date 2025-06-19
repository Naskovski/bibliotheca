<?php

namespace App\Http\Controllers;

use App\Models\BookCopy;
use App\Http\Requests\StoreBookCopyRequest;
use App\Http\Requests\UpdateBookCopyRequest;
use Inertia\Inertia;
use App\Models\BookEdition;

class BookCopyController extends Controller
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
    public function store(StoreBookCopyRequest $request, BookEdition $bookEdition)
    {
        $data = $request->validated();
        $data['book_edition_id'] = $bookEdition->id;
        BookCopy::create($data);

        $bookEdition->load(['book.author', 'publisher']);
        $copies = $bookEdition->bookCopies()->with(['bookEdition'])->get();

        return Inertia::render('BookEditions/Copies', [
            'bookEdition' => $bookEdition,
            'copies' => $copies,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BookCopy $bookCopy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookCopy $bookCopy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookCopyRequest $request, BookCopy $bookCopy)
    {
        $bookCopy->update($request->validated());

        $bookEdition = $bookCopy->bookEdition()->with(['book.author', 'publisher'])->first();
        $copies = $bookEdition->bookCopies()->with(['bookEdition'])->get();

        return Inertia::render('BookEditions/Copies', [
            'bookEdition' => $bookEdition,
            'copies' => $copies,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookCopy $bookCopy)
    {
        $bookEdition = $bookCopy->bookEdition()->with(['book.author', 'publisher'])->first();
        $bookCopy->delete();

        $copies = $bookEdition->bookCopies()->with(['bookEdition'])->get();

        return Inertia::render('BookEditions/Copies', [
            'bookEdition' => $bookEdition,
            'copies' => $copies,
        ]);
    }
}
