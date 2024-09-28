<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailForm extends Model
{
    use HasFactory;

    protected $table = 'detail_ap';
    public $primaryKey = 'detail_id';
    public $timestamps = false;

    protected $fillable = [
        'fap_id',
        'product_id',
        'supplier_id',
        'detail_quantity',
        'detail_price',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'supplier_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}
