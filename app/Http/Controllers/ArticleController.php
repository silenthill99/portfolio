<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use PHPUnit\Runner\Filter\IncludeNameFilterIterator;

class ArticleController extends Controller
{
    public function create()
    {
        return Inertia::render('articles/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|string|max:255",
            'link' => "required|string|max:255",
            "github" => "required|string|max:255",
            'image' => 'required|image|max:8000',
            'description' => "required|string"
        ]);

        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $path = $image->storeAs('images', $imageName, 'public');

        Article::create([
            'title' => $request->title,
            'link' => $request->link,
            'github' => $request->github,
            'path' => $path,
            'description' => $request->description
        ]);

        return redirect()->route('home')->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('articles/update', [
            'article' => $article
        ]);
    }

    public function update(Article $article, Request $request)
    {
        $validated = $request->validate([
            "title" => "required|string|max:255",
            "link" => "required|string|max:255",
            "github" => "required|string|max:255",
            "image" => "nullable|image|max:8000",
            "description" => "required|string"
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $validated['path'] = $image->storeAs('images', $imageName, 'public');
        }

        $article->update($validated);
        return redirect()->route('dashboard')->with('success', 'Article mis à jour.');
    }

    public function destroy(Article $article) {
        $article->delete();
        return redirect()->route('dashboard')->with('success', 'Article supprimé.');
    }

    public function show(Article $article) {

        $path = public_path('images/'.$article->title);
        $images = [];

        if (File::exists($path)) {
            $imageFiles = File::files($path);

            $images = collect($imageFiles)->map(function ($file) use ($article) {
                return "/images/" . $article->title . "/" . $file->getFilename();
            });
        }

        return Inertia::render('articles/show', [
            'article' => $article,
            'images' => $images
        ]);
    }
}
