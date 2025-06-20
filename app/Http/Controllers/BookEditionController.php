<?php

namespace App\Http\Controllers;

use App\Models\BookEdition;
use App\Http\Requests\StoreBookEditionRequest;
use App\Http\Requests\UpdateBookEditionRequest;
use Illuminate\Support\Facades\Log;

class BookEditionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = \App\Models\BookEdition::with(['book.author', 'publisher']);

        // Filters
        $title = request('title');
        $author_id = request('author_id');
        $publisher_id = request('publisher_id');

        if ($title) {
            $query->whereHas('book', function ($q) use ($title) {
                $q->where('title', 'like', "%$title%");
            });
        }
        if ($author_id) {
            $query->whereHas('book', function ($q) use ($author_id) {
                $q->where('author_id', $author_id);
            });
        }
        if ($publisher_id) {
            $query->where('publisher_id', $publisher_id);
        }

        $books = $query->paginate(15)->appends(request()->all());
        $authors = \App\Models\Author::all(['id', 'name']);
        $publishers = \App\Models\Publisher::all(['id', 'name']);

        return \Inertia\Inertia::render('Books/Index', [
            'books' => $books,
            'filters' => [
                'title' => $title,
                'author_id' => $author_id,
                'publisher_id' => $publisher_id,
            ],
            'authors' => $authors,
            'publishers' => $publishers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \Inertia\Inertia::render('BookEditions/Create', [
            'books' => \App\Models\Book::with('author')->get(),
            'publishers' => \App\Models\Publisher::all(),
            'authors' => \App\Models\Author::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookEditionRequest $request)
    {
        // Log the incoming request data
        \Log::info('BookEditionController@store: incoming data', ['request' => $request->all()]);

        $data = $request->validated();
        $data['created_at'] = now();
        $data['updated_at'] = now();

        // Log the validated data before creation
        \Log::info('BookEditionController@store: validated data', ['validated' => $data]);

        $bookEdition = BookEdition::create($data);
        \Log::info('BookEditionController@store: created BookEdition', ['bookEdition' => $bookEdition]);
        return redirect()->route('books.index')->with('success', 'Book edition created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BookEdition $bookEdition)
    {
        $bookEdition->load(['book.author', 'publisher']);

        $copies_left = $bookEdition->bookCopies()
            ->whereDoesntHave('leases', function ($q) {
                $q->whereNull('returned_at');
            })
            ->count();

        // Other editions of the same book (excluding current edition)
        $otherEditionsOfBook = BookEdition::with(['book.author', 'publisher'])
            ->where('book_id', $bookEdition->book_id)
            ->where('id', '!=', $bookEdition->id)
            ->get();

        // Other BookEditions by the same author (excluding current book's editions)
        $otherBookEditionsByAuthor = BookEdition::with(['book.author', 'publisher'])
            ->whereHas('book', function ($q) use ($bookEdition) {
                $q->where('author_id', $bookEdition->book->author_id)
                    ->where('id', '!=', $bookEdition->book_id);
            })
            ->get();

        return \Inertia\Inertia::render('Books/Show', [
            'bookEdition' => $bookEdition,
            'copies_left' => $copies_left,
            'otherEditionsOfBook' => $otherEditionsOfBook,
            'otherBookEditionsByAuthor' => $otherBookEditionsByAuthor,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookEdition $bookEdition)
    {
        return \Inertia\Inertia::render('BookEditions/Edit', [
            'bookEdition' => $bookEdition,
            'books' => \App\Models\Book::with('author')->get(),
            'publishers' => \App\Models\Publisher::all(),
            'authors' => \App\Models\Author::all(),
        ]);
    }

    /**
 * Update the specified resource in storage.
 */
    public function update(UpdateBookEditionRequest $request, BookEdition $bookEdition)
    {
        \Log::info('BookEditionController@update: validated data', [
            'validated' => $request->validated(),
            'bookEdition_id' => $bookEdition->id,
        ]);

        $data = $request->validated();
        $data['updated_at'] = now();
        $bookEdition->update($data);

        \Log::info('BookEditionController@update: updated BookEdition', [
            'bookEdition' => $bookEdition->fresh(),
        ]);

        return redirect()->route('bookEditions.show', $bookEdition->id)->with('success', 'Book edition updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookEdition $bookEdition)
    {
        $bookEdition->delete();
        return redirect()->route('books.index')->with('success', 'Book edition deleted successfully.');
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

    public function copies(BookEdition $bookEdition)
    {
        $bookEdition->load(['book.author', 'publisher']);

        $copies = $bookEdition->bookCopies()
            ->with(['bookEdition'])
            ->get();

        return \Inertia\Inertia::render('BookEditions/Copies', [
            'bookEdition' => $bookEdition,
            'copies' => $copies,
        ]);
    }
}
