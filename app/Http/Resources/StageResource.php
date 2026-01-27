<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'entreprise' => $this->resource->entreprise,
            'competences' => $this->resource->competences,
            'start_at' => $this->resource->start_at,
            'end_at' => $this->resource->end_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->resource->created_at?->format('Y-m-d'),
            'created_at_human' => $this->resource->created_at?->diffForHumans(),
            'objective' => $this->resource->objective
        ];
    }
}
