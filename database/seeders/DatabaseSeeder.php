<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::create([
            'name' => 'asd',
            'email' => 'asd@gmail.com',
            'password' => bcrypt('asd'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

        \App\Models\Post::factory(10)->create();
    }
}
