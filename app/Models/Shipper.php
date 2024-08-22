<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipper extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'shipper_id';

    protected $fillable = [
        'shipper_name',
        'shipper_address',
        'shipper_phone',
    ];
}
