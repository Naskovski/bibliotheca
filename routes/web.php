<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookEditionController;
use App\Http\Controllers\AuthorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/books', [BookEditionController::class, 'index'])->name('books.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Book
Route::get('/Books/create', [BookController::class, 'create'])->name('Books.create');


// Author
Route::get('/authors', [AuthorController::class, 'index']);
