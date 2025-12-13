<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStageRequest;
use App\Http\Requests\UpdateStageRequest;
use App\Models\Stage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StageController extends Controller
{
    public function index()
    {
        $stages = Stage::all();

        return Inertia::render('stages/index', [
            'stages' => $stages,
        ]);
    }

    public function create()
    {
        return Inertia::render('stages/create');
    }

    public function store(StoreStageRequest $request)
    {
        $data = $request->validated();

        Auth::user()->stages()->create($data);

        return redirect()->route('stage.index');
    }

    public function show(Stage $stage)
    {
        return $stage;
    }

    public function update(UpdateStageRequest $request, Stage $stage)
    {
        $data = $request->validated();

        $stage->update($data);

        return redirect(route('stage.show', $stage));
    }

    public function destroy(Stage $stage)
    {
        $this->authorize('delete', $stage);

        $stage->delete();

        return redirect(route('stage.index'));
    }

    public function edit(Stage $stage)
    {
        $this->authorize('update', $stage);

        return Inertia::render('stages/edit', [
            'stage' => $stage,
        ]);
    }
}
