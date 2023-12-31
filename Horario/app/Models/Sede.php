<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sede extends Model
{
    use HasFactory;

    protected $primaryKey = 'idSede';
    public $timestamps = false;


    public function ambientes()
    {
        return $this->hasMany(Ambiente::class, 'idSede');
    }
}
