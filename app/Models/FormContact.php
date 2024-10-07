<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormContact extends Model
{
    use HasFactory;

    protected $table = 'form_contact';
    public $timestamps = false;

    protected $fillable = [
            'name',
            'email',
            'message'
    ];

}
