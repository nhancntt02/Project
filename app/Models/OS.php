<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OS extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'operation_systems';

    protected $fillable = [
        'os_id',
        'os_value',
    ];
}
