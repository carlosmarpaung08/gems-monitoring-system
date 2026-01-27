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
        Schema::create('boqs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('work_package_id')->constrained()->onDelete('cascade');
            $table->string('boq_code')->unique();
            $table->text('description');
            $table->string('uom');
            $table->decimal('budget_qty', 15, 2);
            $table->decimal('unit_rate', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boqs');
    }
};