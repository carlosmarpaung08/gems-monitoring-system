<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectManagementController;

Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/progress/create', [ProjectController::class, 'createProgress'])->name('progress.create');
Route::post('/progress', [ProjectController::class, 'storeProgress'])->name('progress.store');

// Project Management
Route::get('/projects/manage', [ProjectManagementController::class, 'projectIndex'])->name('projects.manage');
Route::get('/projects/create', [ProjectManagementController::class, 'projectCreate'])->name('projects.create');
Route::post('/projects', [ProjectManagementController::class, 'projectStore'])->name('projects.store');
Route::get('/projects/{project}/edit', [ProjectManagementController::class, 'projectEdit'])->name('projects.edit');
Route::put('/projects/{project}', [ProjectManagementController::class, 'projectUpdate'])->name('projects.update');
Route::delete('/projects/{project}', [ProjectManagementController::class, 'projectDestroy'])->name('projects.destroy');

// Work Package Management  
Route::get('/workpackages/manage', [ProjectManagementController::class, 'workPackageIndex'])->name('workpackages.manage');
Route::get('/workpackages/create', [ProjectManagementController::class, 'workPackageCreate'])->name('workpackages.create');
Route::post('/workpackages', [ProjectManagementController::class, 'workPackageStore'])->name('workpackages.store');
Route::get('/workpackages/{workPackage}/edit', [ProjectManagementController::class, 'workPackageEdit'])->name('workpackages.edit');
Route::put('/workpackages/{workPackage}', [ProjectManagementController::class, 'workPackageUpdate'])->name('workpackages.update');
Route::delete('/workpackages/{workPackage}', [ProjectManagementController::class, 'workPackageDestroy'])->name('workpackages.destroy');

// BOQ Management
Route::get('/boqs/manage', [ProjectManagementController::class, 'boqIndex'])->name('boqs.manage');
Route::get('/boqs/create', [ProjectManagementController::class, 'boqCreate'])->name('boqs.create');
Route::post('/boqs', [ProjectManagementController::class, 'boqStore'])->name('boqs.store');
Route::get('/boqs/{boq}/edit', [ProjectManagementController::class, 'boqEdit'])->name('boqs.edit');
Route::put('/boqs/{boq}', [ProjectManagementController::class, 'boqUpdate'])->name('boqs.update');
Route::delete('/boqs/{boq}', [ProjectManagementController::class, 'boqDestroy'])->name('boqs.destroy');

// Progress History
Route::get('/boqs/{boq}/history', [ProjectManagementController::class, 'progressHistory'])->name('boqs.history');