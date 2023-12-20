<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modalidad extends Model
{
    use HasFactory;

    protected $table = 'modalidades'; //desactiva la convencion de nombre por defecto: 'modalidas'
    public $timestamps = false; //desactiva las marcas de tiempo
}
