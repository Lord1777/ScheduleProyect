<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programa extends Model
{
    use HasFactory;

    protected $primaryKey = 'idPrograma';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'duracion',
        'estado',
        'idNivelFormacion',
    ];

    public function nivel()
    {
        return $this->belongsTo(NivelDeFormacion::class, 'idNivelFormacion');
    }
}
