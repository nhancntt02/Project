<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function(Blueprint $table){
            $table->increments('news_id');
            $table->string('news_titel');
            $table->string('news_content');
            $table->string('news_category');
            $table->date('news_date_update');
            $table->string('news_name_author');
            $table->string('news_url_thumbnail');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
