<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkPackage extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'wp_code', 'wp_name', 'discipline_code'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function boqs()
    {
        return $this->hasMany(Boq::class);
    }
}