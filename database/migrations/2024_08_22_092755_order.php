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
        Schema::create('orders', function(Blueprint $table){
            $table->increments('order_id');
            $table->date('order_date_create');
            $table->date('order_date_confirm');
            $table->integer('order_product_money');
            $table->integer('order_transport_money');
            $table->integer('order_discount_money');
            $table->integer('order_total_money');
            $table->string('order_status');

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('employee_id');
            $table->string('payment_id');
            $table->unsignedInteger('ds_id');
            $table->unsignedInteger('shipper_id');


            $table->foreign('employee_id')->references('id')->on('users');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('ds_id')->references('ds_id')->on('discounts');
            $table->foreign('shipper_id')->references('shipper_id')->on('shippers');
            $table->foreign('payment_id')->references('payment_id')->on('payment');
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
