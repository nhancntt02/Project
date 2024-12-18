<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $table = 'rating';

    protected $primaryKey = 'rate_id';
    protected $fillable = [
        'user_id',
        'product_id',
        'order_id',
        'rate_rating',
        'rate_comment',
        'cmt_status',
        'rate_date'
    ];  

    public function customer()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}
