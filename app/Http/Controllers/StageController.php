<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StageController extends Controller
{
    public function index()
    {
        $stage = Stage::all();
        return Inertia::render('stages/index', [
            'stages' => $stage
        ]);
    }

    public function create() {
        return Inertia::render('stages/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'entreprise' => 'required|string|max:255',
            'competences' => 'required|string|max:255',
            'start_at' => "required|date",
            "end_at" => "nullable|date",
        ]);

        Stage::create($data);

        return Inertia::render('stages/create');
    }

    public function show(Stage $stage)
    {
        return $stage;
    }

    public function update(Request $request, Stage $stage)
    {
        $data = $request->validate([
            "title" => "required|string|max:255",
            "entreprise" => "required|string|max:255",
            "competences" => "required|string|max:255",
            "start_at" => "required|date",
            "end_at" => "nullable|date",
        ]);

        $stage->update($data);

        return redirect(route("stage"));
    }

    public function destroy(Stage $stage)
    {
        $stage->delete();

        return redirect(route('stage'));
    }

    public function edit(Stage $stage)
    {
        return Inertia::render('stages/edit', [
            "stage" => $stage
        ]);
    }
}
