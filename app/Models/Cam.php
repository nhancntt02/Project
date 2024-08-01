<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cam extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'cam_id',
        'cam_value',
    ];
}
