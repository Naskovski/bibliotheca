<?php

namespace Database\Factories;

use App\Models\BookCopy;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lease>
 */
class LeaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => User::factory(),
            'librarian_id' => User::factory(),
            'book_copy_id' => BookCopy::factory(),
            'lease_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'return_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(['active', 'returned', 'overdue']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
