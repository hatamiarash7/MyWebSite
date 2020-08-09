<?php

/** @var Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Support\Str;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => 'Arash Hatami',
        'email' => 'hatamiarash7@gmail.com',
        'email_verified_at' => now(),
        'password' => '$2y$10$PHz5vfNxEvqHQdIfZzT4cegx6Driot2rR5uqHKeuT33akE89YUcUy',
        'remember_token' => Str::random(10),
    ];
});
