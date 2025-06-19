<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;

class Message extends Model
{
    protected $fillable = [
        'pseudo', 'email', 'subject', 'message'
    ];
}
