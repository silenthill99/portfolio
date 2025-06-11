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

    public function create_submit(Request $request)
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
}
