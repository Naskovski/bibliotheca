<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lease extends Model
{
    /** @use HasFactory<\Database\Factories\LeaseFactory> */
    use HasFactory;

    protected $fillable = [
        'client_id',
        'librarian_id',
        'book_copy_id',
        'lease_date',
        'return_date',
        'status',
    ];

    protected $attributes = [
        'status' => 'requested',
    ];

    protected $casts = [
        'lease_date' => 'date',
        'return_date' => 'date',
    ];

    public function bookCopy()
    {
        return $this->belongsTo(BookCopy::class);
    }

    public function librarian()
    {
        return $this->belongsTo(User::class, 'librarian_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
