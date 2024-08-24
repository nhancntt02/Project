<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InfoOrder extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'infoorder';

    public $primaryKey = 'io_id'; 

    protected $fillable = [
        'order_id',
        'product_id',
        'io_quantity',
        'io_price'
    ];
}
