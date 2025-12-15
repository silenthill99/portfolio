<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public function storeImage(UploadedFile $image, string $directory = 'images'): string
    {
        $imageName = time().'_'.$image->getClientOriginalName();

        return $image->storeAs($directory, $imageName, 'public');
    }

    public function deleteImage(string $path): void
    {
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
