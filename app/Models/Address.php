<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'address';

    public $primaryKey = 'address_id';
    protected $fillable = [
        'address_note',
        'address_phuong',
        'address_quan',
        'address_tinh',
        'user_id',
    ];
}
