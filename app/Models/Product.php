<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $primaryKey = 'product_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'product_id',
        'product_name',
        'product_description',
        'product_price',
        'product_status',
        'brand_id',
        'cpu_id',
        'ram_id',
        'rom_id',
        'os_id',
        'screen_id',
        'pin_id',
        'cam_id',
    ];
}
