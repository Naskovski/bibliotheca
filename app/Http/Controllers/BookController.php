<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = \App\Models\Book::all();
        return \Inertia\Inertia::render('Books/Index', [
            'books' => $books,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
//        $authors = Author::all();

        return Inertia::render('Books/New', [
            'authors' => Author::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'first_published_date' => 'nullable|date',
            'author_id' => 'required|exists:authors,id',
        ]);

        Book::create($request->all());

        return redirect()->route('books.create')->with('success', 'Book created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return Inertia::render('Books/Edit', [
            'book' => $book,
            'authors' => Author::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        $data = $request->validated();

        \Log::info('Updating book', [
            'book_id' => $book->id,
            'user_id' => auth()->id(),
            'data' => $data,
        ]);

        $book->title = $data['title'];
        $book->first_published_date = $data['first_published_date'] ?? null;
        $book->description = $data['description'] ?? null;
        $book->author_id = $data['author_id'];
        $book->updated_at = now();
        $book->save();

        \Log::info('Book updated successfully', [
            'book_id' => $book->id,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('books.index')
            ->with('success', 'Book updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index')->with('success', 'Book deleted successfully.');
    }
}
