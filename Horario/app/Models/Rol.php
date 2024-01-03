<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    //Especifica la llave primaria
    protected $primaryKey = 'idRol';

    //desactiva las marcas de tiempo
    public $timestamps = false;


     //desactiva la convencion de nombre por defecto: 'rols'
    protected $table = 'roles';


    // Relación inversa: un rol puede tener muchos usuarios
    public function users()
    {
        return $this->hasMany(Usuario::class, 'idRol');
    }
}
