<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoPermiss extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'infopermiss';

    protected $fillable = [
        'permiss_id',
        'employee_id',
        'infopermiss_value',
        
    ];
}
