<?php

use App\Mail\MessageReceiveEmail;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('guests can submit contact form', function () {
    Mail::fake();

    $response = $this->post('/messages', [
        'pseudo' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Test Subject',
        'message' => 'This is a test message.',
    ]);

    $response->assertRedirect(route('messages.create'));
    $this->assertDatabaseHas('messages', [
        'pseudo' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Test Subject',
    ]);

    Mail::assertSent(MessageReceiveEmail::class);
});

test('contact form requires all fields', function () {
    $response = $this->post('/messages', []);

    $response->assertSessionHasErrors(['pseudo', 'email', 'subject', 'message']);
});

test('contact form requires valid email', function () {
    $response = $this->post('/messages', [
        'pseudo' => 'John Doe',
        'email' => 'invalid-email',
        'subject' => 'Test Subject',
        'message' => 'This is a test message.',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('authenticated users can view all messages', function () {
    $user = User::factory()->create();
    Message::factory()->count(5)->create();

    $response = $this->actingAs($user)->get('/messages');

    $response->assertSuccessful();
});

test('guests cannot view messages index', function () {
    Message::factory()->count(5)->create();

    $response = $this->get('/messages');

    $response->assertRedirect(route('login'));
});

test('authenticated users can delete messages', function () {
    $user = User::factory()->create();
    $message = Message::factory()->create();

    $response = $this->actingAs($user)->delete("/messages/{$message->id}");

    $response->assertRedirect(route('messages.index'));
    $this->assertDatabaseMissing('messages', [
        'id' => $message->id,
    ]);
});

test('guests cannot delete messages', function () {
    $message = Message::factory()->create();

    $response = $this->delete("/messages/{$message->id}");

    $response->assertRedirect(route('login'));
    $this->assertDatabaseHas('messages', [
        'id' => $message->id,
    ]);
});
