<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    public $timestamps = false;


    public $primaryKey = 'ds_id';
    protected $fillable = [
        'ds_name',
        'ds_code',
        'ds_value',
        'ds_quantity',
        'ds_start',
        'ds_end',
    ];
}
