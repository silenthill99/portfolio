<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    protected $fillable =[
        //Titre de la fonction exercée
        "title",
        "entreprise",
        "competences",
        "start_at",
        "end_at",
    ];
}
