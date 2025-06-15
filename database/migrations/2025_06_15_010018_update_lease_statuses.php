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
            $table->enum('status', [
                'requested',
                'approved',
                'collected',
                'returned',
                'overdue',
                'cancelled'
            ])->default('requested')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leases', function (Blueprint $table) {
            $table->enum('status', [
                'active',
                'returned',
                'overdue'
            ])->default('active')->change();
        });
    }

};
