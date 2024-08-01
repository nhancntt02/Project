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
        Schema::create('permiss', function(Blueprint $table){
            $table->string('permiss_id');
            $table->string('permiss_name');

            $table->primary('permiss_id');
        });

        Schema::create('employee', function(Blueprint $table){
            $table->string('employee_id');
            $table->string('employee_name');
            $table->string('employee_email')->unique();
            $table->string('employee_password');
            $table->string('employee_phone');
            $table->string('employee_address');
            $table->string('employee_image');

            $table->primary('employee_id');
        });

        Schema::create('infopermiss', function(Blueprint $table){
            $table->string('employee_id');
            $table->string('permiss_id');
            $table->string('infopermiss_value');

            $table->foreign('employee_id')->references('employee_id')->on('employee');
            $table->foreign('permiss_id')->references('permiss_id')->on('permiss');
            
            $table->primary(['employee_id', 'permiss_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permiss');
    }
};
