<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NivelDeFormacion extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'niveles_de_formacion';
}
