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
        'product_quantity',
        'brand_id',
        'cpu_id',
        'ram_id',
        'rom_id',
        'os_id',
        'screen_id',
        'pin_id',
        'cam_id',
    ];

    public function cpu()
    {
        return $this->belongsTo(Cpu::class, 'cpu_id', 'cpu_id');
    }
    public function ram()
    {
        return $this->belongsTo(Ram::class, 'ram_id', 'ram_id');
    }
    public function rom()
    {
        return $this->belongsTo(rom::class, 'rom_id', 'rom_id');
    }
    public function pin()
    {
        return $this->belongsTo(pin::class, 'pin_id', 'pin_id');
    }
    public function os()
    {
        return $this->belongsTo(os::class, 'os_id', 'os_id');
    }
    public function screen()
    {
        return $this->belongsTo(screen::class, 'screen_id', 'screen_id');
    }
    public function cam()
    {
        return $this->belongsTo(cam::class, 'cam_id', 'cam_id');
    }
    public function brand()
    {
        return $this->belongsTo(brand::class, 'brand_id', 'brand_id');
    }
}
