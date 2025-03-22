<?php

namespace Database\Factories;

use App\Models\BookEdition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookCopy>
 */
class BookCopyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'book_edition_id' => BookEdition::factory(),
            'barcode' => $this->faker->unique()->isbn13,
            'status' => $this->faker->randomElement(['available', 'leased', 'lost']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
