<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'pseudo' => $this->resource->pseudo,
            'email' => $this->resource->email,
            'subject' => $this->resource->subject,
            'message' => $this->resource->message,
            'created_at' => $this->resource->created_at?->format('Y-m-d'),
            'created_at_human' => $this->resource->created_at?->diffForHumans(),
        ];
    }
}
