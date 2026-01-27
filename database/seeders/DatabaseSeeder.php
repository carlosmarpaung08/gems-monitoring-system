<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Memanggil ProjectSeeder yang berisi data Project, WP, BOQ, dan Progress
        $this->call([
            ProjectSeeder::class,
        ]);
    }
}