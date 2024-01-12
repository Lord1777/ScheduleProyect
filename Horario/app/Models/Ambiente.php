<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ambiente extends Model
{
    use HasFactory;

    protected $primaryKey = 'idAmbiente';
    public $timestamps = false; //desactiva las marcas de tiempo
    // protected $table = 'ambientes';

    protected $fillable = [
        'estado',
    ];
}
