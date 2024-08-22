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
        Schema::create('discounts', function(Blueprint $table){
            $table->increments('ds_id');
            $table->string('ds_name');
            $table->string('ds_code');
            $table->string('ds_quantity');
            $table->date('ds_start');
            $table->date('ds_end');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discounts');
    }
};
