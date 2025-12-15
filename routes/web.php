<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\StageController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

// Routes publiques pour le formulaire de contact (AVANT la resource)
Route::get('/messages/create', [MessageController::class, 'create'])->name('messages.create');
Route::post('/messages', [MessageController::class, 'store'])->middleware('throttle:5,1')->name('messages.store');

Route::middleware(['auth'])->group(function () {
    Route::resource('articles', ArticleController::class)->except(['index', 'show']);
    Route::resource('/stage', StageController::class)->except('show');
    Route::resource('/messages', MessageController::class)->except(['create', 'store']);
});

Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
