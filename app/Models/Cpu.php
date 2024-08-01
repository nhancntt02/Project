<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cpu extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'cpu_id',
        'cpu_value',
    ];
}
