<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table("articles")->truncate();
        DB::table('articles')->insert([
            'title' => "Jadoo",
            'slug' => Str::slug("Jadoo"),
            "link" => "https://jadoo-v2.vercel.app",
            "github" => 'https://github.com/silenthill99/jadoo-v2.git',
            "path" => "images/Jadoo.png",
            'description' => "Objectif : Créer un site web pour un restaurant japonais fictif afin d'apprendre les bases du HTML et du CSS",
            'created_at' => now(),
            'updated_at' => now()
        ]);
        Article::factory()->create();
    }
}
