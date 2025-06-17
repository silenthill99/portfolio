<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function create()
    {
        return Inertia::render('create');
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|string|max:255",
            'link' => "required|string|max:255",
            'image' => 'required|image|max:8000',
            'description' => "required|string"
        ]);

        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $path = $image->storeAs('images', $imageName, 'public');

        Article::create([
            'title' => $request->title,
            'link' => $request->link,
            'path' => $path,
            'description' => $request->description
        ]);

        return redirect()->route('home')->with('success', 'Article créé avec succès.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('update', [
            'article' => $article
        ]);
    }

    public function update(Article $article, Request $request)
    {
        $validated = $request->validate([
            "title" => "required|string|max:255",
            "link" => "required|string|max:255",
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
}
