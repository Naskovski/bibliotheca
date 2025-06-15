<?php

namespace Database\Seeders;

use App\Models\BookCopy;
use App\Models\Lease;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $statuses = ['active', 'returned', 'overdue'];

        for ($i = 0; $i < 220; $i++) {
            $leaseDate = now()->subDays(fake()->numberBetween(1, 30));
            $isReturned = fake()->boolean(60);
            $returnDate = $isReturned ? (clone $leaseDate)->addDays(fake()->numberBetween(1, 30)) : null;
            $status = $isReturned
                ? fake()->randomElement(['returned', 'overdue'])
                : 'active';

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
