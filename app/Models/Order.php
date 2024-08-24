<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $primaryKey = 'order_id';
    protected $fillable = [
        'order_date_create',
        'order_date_confirm',
        'order_product_money',
        'order_transport_money',
        'order_discount_money',
        'order_total_money',
        'order_status',
        'address_id',
        'user_id',
        'employee_id',
        'payment_id',
        'ds_id',
        'shipper_id',
    ];


}
