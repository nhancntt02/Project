<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pin extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'pin_id',
        'pin_value',
    ];
}
