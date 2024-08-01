<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('rams', function(Blueprint $table) {
            $table->string('ram_id');
            $table->string('ram_value');
            $table->primary('ram_id');
        });
        Schema::create('roms', function(Blueprint $table) {
            $table->string('rom_id');
            $table->string('rom_value');
            $table->primary('rom_id');
        });
        Schema::create('operation_systems', function(Blueprint $table) {
            $table->string('os_id');
            $table->string('os_value');
            $table->primary('os_id');
        });
        Schema::create('cpus', function(Blueprint $table) {
            $table->string('cpu_id');
            $table->string('cpu_value');
            $table->primary('cpu_id');

        });
        Schema::create('pins', function(Blueprint $table) {
            $table->string('pin_id');
            $table->string('pin_value');
            $table->primary('pin_id');
        });
        Schema::create('cams', function(Blueprint $table) {
            $table->string('cam_id');
            $table->string('cam_value');
            $table->primary('cam_id');
        });
        Schema::create('screens', function (Blueprint $table) {
            $table->string('screen_id');
            $table->string('screen_name');
            $table->primary('screen_id');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
