<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormAddProduct extends Model
{
    use HasFactory;

    protected $table = 'form_add_products';

    public $primaryKey = 'fap_id';

    protected $fillable = [
        'fap_content',
        'fap_date_create',
        'fap_date_confirm',
        'employee_id',
        'supplier_id',
        'fap_status',
        'fap_total_amount'
    ];
}
