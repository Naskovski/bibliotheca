<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookCopyController;
use App\Http\Controllers\BookEditionController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\LeaseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/leases', [LeaseController::class, 'store'])->name('leases.store');
    Route::get('/leases', [LeaseController::class, 'index'])->name('leases.index');
    Route::patch('/leases/{lease}', [LeaseController::class, 'update'])->name('leases.update');

    // BookEdition create/edit
    Route::get('/book-editions/create', [BookEditionController::class, 'create'])->name('bookEditions.create');
    Route::get('/book-editions/{bookEdition}/edit', [BookEditionController::class, 'edit'])->name('bookEditions.edit');
    Route::get('/book-editions/{bookEdition}/copies', [BookEditionController::class, 'copies'])->name('bookEditions.copies');
    // BookEdition CRUD (librarian only, policy enforced)
    Route::post('book-editions', [BookEditionController::class, 'store'])->name('bookEditions.store');
    Route::put('book-editions/{bookEdition}', [BookEditionController::class, 'update'])->name('bookEditions.update');

    // Book
    Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
    Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');

    // BookEdition CRUD (librarian only, policy enforced)
    Route::post('books', [BookController::class, 'store'])->name('books.store');
    Route::put('books/{book}', [BookController::class, 'update'])->name('books.update');

    Route::post('/book-editions/{bookEdition}/copies', [BookCopyController::class, 'store']);
    Route::put('/book-copies/{bookCopy}', [BookCopyController::class, 'update']);
    Route::delete('/book-copies/{bookCopy}', [BookCopyController::class, 'destroy']);

    // Author CRUD (librarian only)
    Route::post('/authors', [AuthorController::class, 'store']);
    Route::put('/authors/{author}', [AuthorController::class, 'update']);
    Route::delete('/authors/{author}', [AuthorController::class, 'destroy']);

    // Publisher CRUD (librarian only)
    Route::post('/publishers', [\App\Http\Controllers\PublisherController::class, 'store']);
    Route::put('/publishers/{publisher}', [\App\Http\Controllers\PublisherController::class, 'update']);
    Route::delete('/publishers/{publisher}', [\App\Http\Controllers\PublisherController::class, 'destroy']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


Route::get('/books', [BookEditionController::class, 'index'])->name('books.index');
Route::get('/book-editions/{bookEdition}', [BookEditionController::class, 'show'])->name('bookEditions.show');

// Author
Route::get('/authors', [AuthorController::class, 'index']);

// Publisher
Route::get('/publishers', [\App\Http\Controllers\PublisherController::class, 'index']);

