<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailForm extends Model
{
    use HasFactory;

    protected $table = 'detail_ap';
    public $timestamps = false;

    protected $fillable = [
        'fap_id',
        'product_id',
        'detail_quantity',
        'detail_price',
    ];
}
