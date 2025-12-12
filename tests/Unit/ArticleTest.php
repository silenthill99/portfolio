<?php

use App\Http\Requests\StoreArticleRequest;
use App\Models\Article;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

test('Les non connectés ne peuvent mas ajouter d\'articles', function () {
    Auth::shouldReceive('check')->andReturn(false);

    $request = new StoreArticleRequest();

    expect($request->authorize())->toBeFalse();
});
