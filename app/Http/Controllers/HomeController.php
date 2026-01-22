<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Http\Resources\StageResource;
use App\Models\Article;
use App\Models\Stage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $articles = Article::with('user')->paginate(9);
        $stages = Stage::with('user')->orderBy('id', 'desc')->limit(5)->get();

        return Inertia::render('welcome', [
            'articles' => ArticleResource::collection($articles),
            'stages' => StageResource::collection($stages),
        ])->withViewData([
            'title' => 'Portfolio - Mes projets',
            'description' => 'Découvrez mes projets et réalisations en développement web',
        ]);
    }
}
