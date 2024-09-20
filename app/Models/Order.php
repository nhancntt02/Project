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
        'order_date_shipper_receive',
        'order_date_payment',
        'order_date_comple',
        'order_date_rating',
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

    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id', 'id');
    }
    public function payment()
    {
        return $this->belongsTo(Payment::class, 'payment_id', 'payment_id');
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class, 'ds_id', 'ds_id');
    }

    public function shipper()
    {
        return $this->belongsTo(Shipper::class, 'shipper_id', 'shipper_id');
    }
}
