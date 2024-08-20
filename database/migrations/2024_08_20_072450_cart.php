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
        Schema::create('carts', function(Blueprint $table) {
            $table->string('product_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('cart_quantity');

            $table->primary(['product_id', 'user_id']);
            $table->foreign('product_id')->references('product_id')->on('products');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
