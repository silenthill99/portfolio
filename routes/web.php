<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\StageController;
use App\Models\Article;
use App\Models\Stage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Article::with('user')->paginate(9);
    $stages = Stage::with('user')->orderBy('id', 'desc')->limit(5)->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
        'stages' => $stages,
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $list = Article::with('user')->paginate(10);

        return Inertia::render('dashboard', ['articles' => $list]);
    })->name('dashboard');
});

// Routes publiques pour le formulaire de contact (AVANT la resource)
Route::get('/messages/create', [MessageController::class, 'create'])->name('messages.create');
Route::post('/messages', [MessageController::class, 'store'])->middleware('throttle:5,1')->name('messages.store');

Route::middleware(['auth'])->group(function () {
    Route::resource('articles', ArticleController::class)->except(['index', 'show']);
    Route::resource('/stage', StageController::class);
    Route::resource('/messages', MessageController::class)->except(['create', 'store']);
});

Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
