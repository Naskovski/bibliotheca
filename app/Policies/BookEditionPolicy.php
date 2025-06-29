<?php

namespace App\Policies;

use App\Models\BookEdition;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;

class BookEditionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, BookEdition $bookEdition): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        \Log::info('Checking if user can create BookEdition', ['user_id' => $user->id, 'role' => $user->role]);
        return $user->role === 'librarian';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, BookEdition $bookEdition): bool
    {
        return $user->role === 'librarian';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, BookEdition $bookEdition): bool
    {
        return $user->role === 'librarian';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, BookEdition $bookEdition): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, BookEdition $bookEdition): bool
    {
        return false;
    }
}
