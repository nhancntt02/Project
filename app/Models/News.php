<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $primaryKey = 'news_id'; 
    protected $fillable = [
        'news_title',
        'news_content',
        'news_category',
        'news_date_update',
        'news_name_author',
        'news_url_thumbnail',
    ];
}
