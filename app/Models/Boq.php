<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boq extends Model
{
    use HasFactory;

    protected $fillable = ['work_package_id', 'boq_code', 'description', 'uom', 'budget_qty', 'unit_rate'];

    public function workPackage()
    {
        return $this->belongsTo(WorkPackage::class);
    }

    public function progressEntries()
    {
        return $this->hasMany(ProgressEntry::class);
    }
}