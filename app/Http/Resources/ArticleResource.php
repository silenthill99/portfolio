<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ArticleResource extends JsonResource
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
            'slug' => $this->resource->slug,
            'description' => $this->resource->description,
            'link' => $this->resource->link,
            'github' => $this->resource->github,
            'path' => $this->resource->path,
            'image_url' => $this->resource->path ? Storage::url($this->resource->path) : null,
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->resource->created_at?->format('Y-m-d'),
            'created_at_human' => $this->resource->created_at?->diffForHumans(),
        ];
    }
}
