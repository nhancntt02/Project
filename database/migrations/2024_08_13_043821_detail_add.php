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
        Schema::create('detail_ap', function (Blueprint $table) {
            $table->unsignedInteger('fap_id');
            $table->string('product_id');
            $table->integer('detail_quantity');
            $table->integer('detail_price');

            $table->primary(['fap_id', 'product_id']);

            // Set khoa ngoai
            $table->foreign('fap_id')->references('fap_id')->on('form_add_products');
            $table->foreign('product_id')->references('product_id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
