<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateStageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('update', $this->route('stage'));
    }

    /**
     * Get the validation rules that apply to the request.1
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
