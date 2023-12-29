<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $primaryKey = 'idRol';
    public $timestamps = false; //desactiva las marcas de tiempo
    protected $table = 'roles'; //desactiva la convencion de nombre por defecto: 'rols'
}
