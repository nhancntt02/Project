<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notify extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'notify';

    public $primaryKey = 'notify_id';

    protected $fillable = [
        'notify_title',
        'notify_content',
        'notify_status',
        'user_id',
    ];

}
