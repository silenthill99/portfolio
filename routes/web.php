<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\StageController;
use App\Models\Article;
use App\Models\Message;
use App\Models\Stage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Article::all();
    $stages = Stage::orderBy('id', 'desc')->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
        'stages' => $stages,
    ]);
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $list = Article::all();

        return Inertia::render('dashboard', ['articles' => $list]);
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('articles', ArticleController::class)->except(['index', 'show']);
    Route::resource('/stage', StageController::class);
});

Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

Route::get('/contact/create', [MessageController::class, 'create'])->name('contact.create');
Route::post('/contact', [MessageController::class, 'store'])->name('contact.store');
Route::get("/contact", [MessageController::class, 'index'])->name('contact.index');

Route::get("/test", function () {
    dd("Test");
})->can("view-any", Message::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
