<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'articles' => ArticleResource::collection(
                Article::with('user')->paginate(10)
            ),
        ]);
    }
}
