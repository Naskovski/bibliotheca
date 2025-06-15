<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookEdition;
use App\Models\BookCopy;
use App\Models\Publisher;
use App\Models\Lease;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);

        author::factory(5)->create();
        book::factory(10)->create();
        bookEdition::factory(20)->create();
        bookCopy::factory(50)->create();
        lease::factory(3)->create();
        publisher::factory(5)->create();

        $this->call(\Database\Seeders\LeaseSeeder::class);

    }
}
