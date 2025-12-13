<?php

use App\Models\Article;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use function Pest\Laravel\assertDatabaseMissing;

test('authenticated users can create article', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/articles', [
        'title' => 'Mon super titre',
        "link" => "http://example.com",
        "github" => "http://github.com/example",
        "image" => UploadedFile::fake()->image('image.jpg'),
        "description" => "Une belle description",
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('articles', [
        'title' => 'Mon super titre',
        'user_id' => $user->id,
    ]);
});

test('guest can\'t create article', function () {
//    Storage::fake('public');
    $response = $this->post('/articles', [
        'title' => 'Mon super titre',
        "link" => "http://example.com",
        "github" => "http://github.com/example",
//        "image" => UploadedFile::fake()->image('image.jpg'),
        "description" => "Une belle description",
    ]);
    $response->assertRedirect(route('login'));
});


test('authenticated users can update their own articles', function () {
//    Storage::fake('public');
    $user = User::factory()->create();
    $article = Article::factory()->create(["user_id" => $user->id]);

    $response = $this->actingAs($user)->patch("/articles/{$article->slug}", [
        'title' => 'Mon super titre 1',
        "link" => "http://example.com",
        "github" => "http://github.com/example",
//        "image" => UploadedFile::fake()->image('image.jpg'),
        "description" => "Une belle description",
    ]);
    $response->assertRedirect();
    $this->assertDatabaseHas('articles', [
        'title' => 'Mon super titre 1',
        'id' => $article->id,
    ]);
});

test('users can\'t update articles from others', function () {
    $user = User::factory()->create();
    $owner = User::factory()->create();
    $article = Article::factory()->create(["user_id" => $owner->id]);

    $response = $this->actingAs($user)->patch("/articles/{$article->slug}", [
        'title' => 'Mon super titre 2',
        "link" => "http://example.com",
        "github" => "http://github.com/example",
        "description" => "Une belle description",
    ]);
    $response->assertForbidden();
    $this->assertDatabaseMissing('articles', [
        'title' => 'Mon super titre 2',
        'id' => $article->id,
    ]);
});

test('guests can\'t update articles', function () {
    $article = Article::factory()->create();
    $response = $this->patch("/articles/{$article->slug}", [
        'title' => 'Mon super titre 3',
        "link" => "http://example.com",
        "github" => "http://github.com/example",
        "description" => "Une belle description",
    ]);
    $response->assertRedirect(route('login'));
    $this->assertDatabaseMissing('articles', [
        'title' => 'Mon super titre 3',
        'id' => $article->id,
    ]);
});
