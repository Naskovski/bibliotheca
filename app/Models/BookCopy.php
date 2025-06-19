<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookCopy extends Model
{
    /** @use HasFactory<\Database\Factories\BookCopyFactory> */
    use HasFactory;

    protected $fillable = [
        'barcode',
        'status',
        'book_edition_id',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function bookEdition()
    {
        return $this->belongsTo(BookEdition::class);
    }

    public function leases()
    {
        return $this->hasMany(Lease::class);
    }
}
