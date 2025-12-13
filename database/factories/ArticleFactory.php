<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => User::factory(),
            "title" => $this->faker->sentence(),
            "slug" => $this->faker->slug(),
            "link" => $this->faker->url(),
            "github" => $this->faker->url(),
            "path" => $this->faker->url(),
            "description" => $this->faker->text(),
            "created_at" => $this->faker->dateTime(),
            "updated_at" => $this->faker->dateTime()
        ];
    }
}
