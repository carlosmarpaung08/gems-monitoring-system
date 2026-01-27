<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressEntry extends Model
{
    use HasFactory;

    protected $fillable = ['boq_id', 'progress_date', 'actual_qty'];

    public function boq()
    {
        return $this->belongsTo(Boq::class);
    }
}