<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookEditionController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\LeaseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::post('/leases', [LeaseController::class, 'store'])->name('leases.store');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Book
Route::get('/Books/create', [BookController::class, 'create'])->name('Books.create');

Route::get('/books', [BookEditionController::class, 'index'])->name('books.index');
Route::get('/books/editions/{bookEdition}', [BookEditionController::class, 'show'])->name('bookEditions.show');

// Author
Route::get('/authors', [AuthorController::class, 'index']);
