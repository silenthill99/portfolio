<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function create()
    {
        return Inertia::render('articles/create');
    }

    public function store(StoreArticleRequest $request)
    {
        $data = $request->validated();

        $image = $request->file('image');
        $imageName = time().'_'.$image->getClientOriginalName();
        $data['path'] = $image->storeAs('images', $imageName, 'public');

        Article::create($data);

        return redirect()->route('home')->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('articles/update', [
            'article' => $article,
        ]);
    }

    public function update(Article $article, UpdateArticleRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            if ($article->path) {
                $this->deleteFile($article->path);
            }
            $image = $request->file('image');
            $imageName = time().'_'.$image->getClientOriginalName();
            $validated['path'] = $image->storeAs('images', $imageName, 'public');
        }

        $article->update($validated);

        return redirect()->route('dashboard')->with('success', 'Article mis à jour.');
    }

    public function destroy(Article $article)
    {
        if ($article->path) {
            $this->deleteFile($article->path);
        }
        $article->delete();

        return redirect()->route('dashboard')->with('success', 'Article supprimé.');
    }

    public function show(Article $article)
    {

        $path = public_path('images/'.$article->title);
        $images = [];

        if (File::exists($path)) {
            $imageFiles = File::files($path);

            $images = collect($imageFiles)->map(function ($file) use ($article) {
                return '/images/'.$article->title.'/'.$file->getFilename();
            });
        }

        return Inertia::render('articles/show', [
            'article' => $article,
            'images' => $images,
        ]);
    }

    public function deleteFile(string $file)
    {
        if (Storage::disk('public')->exists($file)) {
            Storage::disk('public')->delete($file);
        }
    }
}
