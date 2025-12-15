<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Services\FileService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function __construct(private FileService $fileService) {}

    public function create()
    {
        return Inertia::render('articles/create');
    }

    public function store(StoreArticleRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $data['path'] = $this->fileService->storeImage($image);
        }

        Auth::user()->articles()->create($data);

        return redirect()->route('home')->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        $this->authorize('update', $article);

        return Inertia::render('articles/update', [
            'article' => $article,
        ]);
    }

    public function update(Article $article, UpdateArticleRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($article->path) {
                $this->fileService->deleteImage($article->path);
            }
            $image = $request->file('image');
            $validated['path'] = $this->fileService->storeImage($image);
        }

        $article->update($validated);

        return redirect()->route('dashboard')->with('success', 'Article mis à jour.');
    }

    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);

        if ($article->path) {
            $this->fileService->deleteImage($article->path);
        }
        $article->delete();

        return redirect()->route('dashboard')->with('success', 'Article supprimé.');
    }

    public function show(Article $article)
    {
        $article->load('user');

        return Inertia::render('articles/show', [
            'article' => new ArticleResource($article),
            'images' => Inertia::defer(fn () => $this->getArticleImages($article)),
        ])->withViewData([
            'title' => $article->title.' - Portfolio',
            'description' => Str::limit($article->description, 160),
        ]);
    }

    private function getArticleImages(Article $article): array
    {
        $images = [];
        $path = public_path('images/'.$article->title);

        if (file_exists($path) && is_dir($path)) {
            $imageFiles = array_diff(scandir($path), ['.', '..']);

            $images = collect($imageFiles)->map(function ($file) use ($article) {
                return '/images/'.$article->title.'/'.$file;
            })->values()->toArray();
        }

        return $images;
    }
}
