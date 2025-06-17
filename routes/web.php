<?php

use App\Http\Controllers\ArticleController;
use App\Models\Article;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Article::all();

    return Inertia::render('welcome', [
        'articles' => $articles
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $list = Article::all();
        return Inertia::render('dashboard', ['articles' => $list]);
    })->name('dashboard');
});

Route::get('/create', [ArticleController::class, 'create'])->name('create');
Route::post('/create', [ArticleController::class, "store"])->name('create.submit');

Route::get("/update/{article}", [ArticleController::class, "edit"])->name("update");
Route::post("/update/{article}", [ArticleController::class, "update"])->name('update.submit');

Route::delete("/delete/{article}", [ArticleController::class, "destroy"])->name('article.destroy');
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
