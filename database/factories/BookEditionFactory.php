<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookEdition>
 */
class BookEditionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'book_id' => Book::factory(),
            'publisher_id' => Publisher::factory(),
            'isbn' => $this->faker->unique()->isbn13,
            'published_date' => $this->faker->date,
            'photo_url' => $this->faker->imageUrl(640, 480, 'books'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
