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
        //
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
}
