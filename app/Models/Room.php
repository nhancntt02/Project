<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'user_id',
        'room_name',
        'room_key',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
