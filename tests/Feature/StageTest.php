<?php

use App\Models\Stage;
use App\Models\User;

test('authenticated users can create stage', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/stages', [
        'title' => 'Stage Développeur',
        'entreprise' => 'Tech Corp',
        'competences' => 'Laravel, React, MySQL',
        'start_at' => '2024-01-01',
        'end_at' => '2024-06-30',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('stages', [
        'title' => 'Stage Développeur',
        'user_id' => $user->id,
    ]);
});

test('guest can\'t create stage', function () {
    $response = $this->post('/stages', [
        'title' => 'Stage Développeur',
        'entreprise' => 'Tech Corp',
        'competences' => 'Laravel, React, MySQL',
        'start_at' => '2024-01-01',
        'end_at' => '2024-06-30',
    ]);

    $response->assertRedirect(route('login'));
});

test('authenticated users can update their own stages', function () {
    $user = User::factory()->create();
    $stage = Stage::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->patch("/stages/{$stage->id}", [
        'title' => 'Stage Développeur Senior',
        'entreprise' => 'New Tech Corp',
        'competences' => 'Laravel, React, MySQL, Docker',
        'start_at' => '2024-01-01',
        'end_at' => '2024-12-31',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('stages', [
        'title' => 'Stage Développeur Senior',
        'id' => $stage->id,
    ]);
});

test('users can\'t update stages from others', function () {
    $user = User::factory()->create();
    $owner = User::factory()->create();
    $stage = Stage::factory()->create(['user_id' => $owner->id]);

    $response = $this->actingAs($user)->patch("/stages/{$stage->id}", [
        'title' => 'Unauthorized Update',
        'entreprise' => 'Evil Corp',
        'competences' => 'Hacking',
        'start_at' => '2024-01-01',
        'end_at' => '2024-12-31',
    ]);

    $response->assertForbidden();
    $this->assertDatabaseMissing('stages', [
        'title' => 'Unauthorized Update',
        'id' => $stage->id,
    ]);
});

test('guests can\'t update stages', function () {
    $stage = Stage::factory()->create();

    $response = $this->patch("/stages/{$stage->id}", [
        'title' => 'Unauthorized Guest Update',
        'entreprise' => 'Evil Corp',
        'competences' => 'Hacking',
        'start_at' => '2024-01-01',
        'end_at' => '2024-12-31',
    ]);

    $response->assertRedirect(route('login'));
    $this->assertDatabaseMissing('stages', [
        'title' => 'Unauthorized Guest Update',
        'id' => $stage->id,
    ]);
});

test('authenticated users can delete their own stages', function () {
    $user = User::factory()->create();
    $stage = Stage::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->delete("/stages/{$stage->id}");

    $response->assertRedirect();
    $this->assertDatabaseMissing('stages', [
        'id' => $stage->id,
    ]);
});

test('users can\'t delete stages from others', function () {
    $user = User::factory()->create();
    $owner = User::factory()->create();
    $stage = Stage::factory()->create(['user_id' => $owner->id]);

    $response = $this->actingAs($user)->delete("/stages/{$stage->id}");

    $response->assertForbidden();
    $this->assertDatabaseHas('stages', [
        'id' => $stage->id,
    ]);
});

test('guests can\'t delete stages', function () {
    $stage = Stage::factory()->create();

    $response = $this->delete("/stages/{$stage->id}");

    $response->assertRedirect(route('login'));
    $this->assertDatabaseHas('stages', [
        'id' => $stage->id,
    ]);
});

test('authenticated users can view stages index', function () {
    $user = User::factory()->create();
    Stage::factory()->count(3)->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)->get('/stages');

    $response->assertSuccessful();
});
