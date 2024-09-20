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

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }
}
