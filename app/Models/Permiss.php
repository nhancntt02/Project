<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permiss extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'permiss';

    protected $fillable = [
        'permiss_id',
        'permiss_name',
    ];
}
