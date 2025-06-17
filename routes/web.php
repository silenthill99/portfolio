<?php

use App\Http\Controllers\ArticleController;
use App\Models\Article;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $list = Article::all();
        return Inertia::render('dashboard', ['articles' => $list]);
    })->name('dashboard');
});

Route::get('/create', [ArticleController::class, 'create'])->name('create');

Route::post('/create', [ArticleController::class, "store"])->name('create.submit');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
