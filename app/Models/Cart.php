<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $incrementing = false;


    protected $fillable = [
        'user_id',
        'product_id',
        'cart_quantity',
    ];
}
