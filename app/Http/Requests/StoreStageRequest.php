<?php

namespace App\Http\Requests;

use App\Models\Stage;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreStageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', Stage::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'entreprise' => 'required|string|max:255',
            'competences' => 'required|string|max:255',
            'start_at' => 'required|date',
            'end_at' => 'nullable|date',
        ];
    }
}
