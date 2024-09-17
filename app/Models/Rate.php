<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $table = 'rating';


    protected $fillable = [
        'user_id',
        'product_id',
        'order_id',
        'rate_rating',
        'rate_comment',
        'rate_date'
    ];  
}
