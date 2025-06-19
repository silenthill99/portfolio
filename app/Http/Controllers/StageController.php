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

    public function store(Request $request)
    {
        $data = $request->validate([

        ]);

        return Stage::create($data);
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
