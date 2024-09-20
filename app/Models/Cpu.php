<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cpu extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    protected $primaryKey = 'cpu_id';
    public $incrementing = false;

    protected $fillable = [
        'cpu_id',
        'cpu_value',
    ];
}
