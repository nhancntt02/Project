<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InfoPermiss extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'infopermiss';

    protected $fillable = [

        'employee_id',
        'QMAX',
        'QNV',
        'QNVBH',
        'QNVBL',
        'QNVNK',
        'QNVTB',
        'QNVTT'

    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id', 'id');
    }

    // public function permiss()
    // {
    //     return $this->belongsTo(Permiss::class, 'permiss_id', 'permiss_id');
    // }
}
