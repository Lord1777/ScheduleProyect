<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trimestre extends Model
{
    use HasFactory;

    protected $primaryKey = 'idTrimestre';
    public $timestamps = false;

    protected $hidden = [
        'estado',
    ];

    protected $fillable = [
        'estado',
    ];
}
