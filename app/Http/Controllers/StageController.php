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
        return Inertia::render('stage-list', [
            'stages' => $stage
        ]);
    }

    public function create() {
        return Inertia::render('add');
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

        return Inertia::render('add');
    }

    public function show(Stage $stage)
    {
        return $stage;
    }

    public function update(Request $request, Stage $stage)
    {
        $data = $request->validate([

        ]);

        $stage->update($data);

        return $stage;
    }

    public function destroy(Stage $stage)
    {
        $stage->delete();

        return response()->json();
    }
}
