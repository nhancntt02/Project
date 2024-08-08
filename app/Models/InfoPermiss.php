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
        'permiss_id',
        'employee_id',
        'infopermiss_value',
        
    ];

    // public function employee(): BelongsTo{
    //     return $this->belongsTo(User::class, 'employee_id', 'id');
    // }
}
