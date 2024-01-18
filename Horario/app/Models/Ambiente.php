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
        'ambiente',
        'capacidad',
        'cantidadMesas',
        'aireAcondicionado',
        'videoBeam',
        'tablero',
        'cantidadComputadores',
        'limiteHoras',
        'horasAsignadas',
        'estado',
        'idSede',
        'estado',
    ];

    public function sede()
    {
        return $this->belongsTo(Sede::class, 'idSede');
    }
}
