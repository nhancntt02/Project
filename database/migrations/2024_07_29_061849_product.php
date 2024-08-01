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
        Schema::create('products', function (Blueprint $table) {
            $table->string('product_id');
            $table->string('product_name');
            $table->string('product_description');
            $table->integer('product_price');
            $table->string('product_status');
            $table->string('brand_id');
            $table->string('cpu_id');
            $table->string('ram_id');
            $table->string('rom_id');
            $table->string('os_id');
            $table->string('screen_id');
            $table->string('pin_id');
            $table->string('cam_id');

            // them cac khoa
            $table->primary('product_id');
            $table->foreign('brand_id')->references('brand_id')->on('brands');
            $table->foreign('cpu_id')->references('cpu_id')->on('cpus');
            $table->foreign('ram_id')->references('ram_id')->on('rams');
            $table->foreign('rom_id')->references('rom_id')->on('roms');
            $table->foreign('os_id')->references('os_id')->on('operation_systems');
            $table->foreign('screen_id')->references('screen_id')->on('screens');
            $table->foreign('pin_id')->references('pin_id')->on('pins');
            $table->foreign('cam_id')->references('cam_id')->on('cams');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('products');
    }
};
