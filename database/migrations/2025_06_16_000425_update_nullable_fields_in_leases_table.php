<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('leases', function (Blueprint $table) {
            $table->foreignId('librarian_id')->nullable()->change();
            $table->foreignId('book_copy_id')->nullable()->change();
            $table->date('lease_date')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leases', function (Blueprint $table) {
            $table->foreignId('librarian_id')->nullable(false)->change();
            $table->foreignId('book_copy_id')->nullable(false)->change();
            $table->date('lease_date')->nullable(false)->change();
        });
    }
};
