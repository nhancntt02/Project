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

        Schema::create('infopermiss', function(Blueprint $table){
            $table->unsignedBigInteger('employee_id');
            $table->string('permiss_id');
            $table->string('infopermiss_value');

            $table->foreign('employee_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('permiss_id')->references('permiss_id')->on('permiss')->onDelete('cascade');
            
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
