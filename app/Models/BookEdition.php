<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookEdition extends Model
{
    /** @use HasFactory<\Database\Factories\BookEditionFactory> */
    use HasFactory;

    protected $fillable = [
        'book_id',
        'publisher_id',
        'isbn',
        'published_date',
        'photo_url',
        'created_at',
        'updated_at',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'published_date',
    ];

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
