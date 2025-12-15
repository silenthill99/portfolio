<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Stage;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $articles = Article::with('user')->paginate(9);
        $stages = Stage::with('user')->orderBy('id', 'desc')->limit(5)->get();

        // Transform articles to include image_url
        $articles->getCollection()->transform(function ($article) {
            $article->image_url = $article->path ? Storage::url($article->path) : null;

            return $article;
        });

        return Inertia::render('welcome', [
            'articles' => $articles,
            'stages' => $stages,
        ])->withViewData([
            'title' => 'Portfolio - Mes projets',
            'description' => 'Découvrez mes projets et réalisations en développement web',
        ]);
    }
}
