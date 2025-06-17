<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {

        DB::table('articles')->insert([
            'title' => "Jadoo",
            "link" => "https://jadoo-v2.vercel.app",
            "github" => 'https://github.com/silenthill99/jadoo-v2.git',
            "path" => "images/Jadoo.png",
            'description' => "Objectif : Créer un site web pour un restaurant japonais fictif afin d'apprendre les bases du HTML et du CSS",
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
