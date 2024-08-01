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
        //
        Schema::create('images', function(Blueprint $table) {
            $table->string('image_id');
            $table->string('image_value');
            $table->string('product_id');
            // Them khoa chinh va khoa ngoai
            $table->primary('image_id');
            $table->foreign('product_id')->references('product_id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('images');
    }
};
