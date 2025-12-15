<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
//        $articles = Article::with('user')->paginate(10);

//        // Transform articles to include image_url
//        $articles->getCollection()->transform(function ($article) {
//            $article->image_url = $article->path ? Storage::url($article->path) : null;
//
//            return $article;
//        });

        return Inertia::render('dashboard', [
            'articles' => ArticleResource::collection(
                Article::with('user')->paginate(10)
            )
        ]);
    }
}
