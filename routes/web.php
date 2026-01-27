<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;

Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/progress/create', [ProjectController::class, 'createProgress'])->name('progress.create');
Route::post('/progress', [ProjectController::class, 'storeProgress'])->name('progress.store');