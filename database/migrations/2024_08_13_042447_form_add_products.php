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
        Schema::create('form_add_products', function (Blueprint $table) {
            $table->increments('fap_id');
            $table->string('fap_content');
            $table->date('fap_date_create');
            $table->date('fap_date_comfirm');
            $table->unsignedBigInteger('employee_id');
            $table->string('supplier_id');
            $table->timestamps();
            // Trạng thái xác nhận nhiều nhập
            $table->integer('fap_status')->default(0);
            $table->integer('fap_total_amount');
            // Thêm ràng buộc khóa ngoại
            $table->foreign('employee_id')->references('id')->on('users');
            $table->foreign('supplier_id')->references('supplier_id')->on('suppliers');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_add_products');
    }
};
