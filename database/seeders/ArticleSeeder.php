<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {

        DB::table('articles')->insert([
            'title' => "Spy x family",
            "link" => "Essai",
            "path" => "images/1750147289_Spy family 1.jpg",
            'description' => "Spy x family",
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
