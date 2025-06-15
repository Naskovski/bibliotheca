<?php

namespace Database\Seeders;

use App\Models\BookCopy;
use App\Models\Lease;
use App\Models\User;
use Illuminate\Database\Seeder;

class LeaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = User::pluck('id')->all();
        $bookCopyIds = BookCopy::pluck('id')->all();
        $statuses = [
            'requested',
            'approved',
            'collected',
            'returned',
            'overdue',
            'cancelled'
        ];

        for ($i = 0; $i < 220; $i++) {
            $leaseDate = now()->subDays(fake()->numberBetween(1, 30));
            $returnDate = fake()->boolean(60) ? (clone $leaseDate)->addDays(fake()->numberBetween(1, 30)) : null;
            $status = fake()->randomElement($statuses);

            Lease::create([
                'client_id' => fake()->randomElement($userIds),
                'librarian_id' => fake()->randomElement($userIds),
                'book_copy_id' => fake()->randomElement($bookCopyIds),
                'lease_date' => $leaseDate,
                'return_date' => $returnDate,
                'status' => $status,
            ]);
        }
    }
}
