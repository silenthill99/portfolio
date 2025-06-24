<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\StageController;
use App\Models\Article;
use App\Models\Stage;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $articles = Article::all();
    $stages = Stage::orderBy("id", "desc")->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
        'stages' => $stages
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

Route::get("/show/{article}", [ArticleController::class, "show"])->name("article.show");

Route::get("/contact", [MessageController::class, "index"])->name('contact');
Route::post("/contact", [MessageController::class, "store"])->name('contact.submit');

Route::get("/stage", [StageController::class, "index"])->middleware("auth")->name('stage');
Route::get("/stage/{stage}/edit", [StageController::class, "edit"])->name("stage.edit");

Route::put("/stage/{stage}", [StageController::class, "update"])->name("stage.update");
Route::delete("/stage/{stage}/delete", [StageController::class, 'destroy'])->name("stage.destroy");

Route::get("/add", [StageController::class, "create"])->middleware("auth")->name('add');
Route::post("/add", [StageController::class, "store"])->middleware("auth")->name('add.submit');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
