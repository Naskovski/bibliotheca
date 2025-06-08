<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookEdition extends Model
{
    /** @use HasFactory<\Database\Factories\BookEditionFactory> */
    use HasFactory;

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function bookCopies()
    {
        return $this->hasMany(BookCopy::class);
    }
}
