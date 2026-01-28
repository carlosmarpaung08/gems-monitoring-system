<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\WorkPackage;
use App\Models\Boq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectManagementController extends Controller
{
    // ==================== PROJECT CRUD ====================
    
    public function projectIndex()
    {
        $projects = Project::withCount(['workPackages'])->get();
        return Inertia::render('Management/ProjectList', [
            'projects' => $projects
        ]);
    }

    public function projectCreate()
    {
        return Inertia::render('Management/ProjectForm');
    }

    public function projectStore(Request $request)
    {
        $validated = $request->validate([
            'project_code' => 'required|string|unique:projects,project_code|max:50',
            'project_name' => 'required|string|max:255',
        ]);

        Project::create($validated);

        return redirect()->route('projects.manage')
            ->with('success', 'Project created successfully!');
    }

    public function projectEdit(Project $project)
    {
        return Inertia::render('Management/ProjectForm', [
            'project' => $project
        ]);
    }

    public function projectUpdate(Request $request, Project $project)
    {
        $validated = $request->validate([
            'project_code' => 'required|string|max:50|unique:projects,project_code,' . $project->id,
            'project_name' => 'required|string|max:255',
        ]);

        $project->update($validated);

        return redirect()->route('projects.manage')
            ->with('success', 'Project updated successfully!');
    }

    public function projectDestroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.manage')
            ->with('success', 'Project deleted successfully!');
    }

    // ==================== WORK PACKAGE CRUD ====================
    
    public function workPackageIndex()
    {
        $workPackages = WorkPackage::with(['project'])
            ->withCount(['boqs'])
            ->get();
        
        $projects = Project::all();

        return Inertia::render('Management/WorkPackageList', [
            'workPackages' => $workPackages,
            'projects' => $projects
        ]);
    }

    public function workPackageCreate()
    {
        $projects = Project::all();
        return Inertia::render('Management/WorkPackageForm', [
            'projects' => $projects
        ]);
    }

    public function workPackageStore(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'wp_code' => 'required|string|unique:work_packages,wp_code|max:50',
            'wp_name' => 'required|string|max:255',
            'discipline_code' => 'required|string|max:50',
        ]);

        WorkPackage::create($validated);

        return redirect()->route('workpackages.manage')
            ->with('success', 'Work Package created successfully!');
    }

    public function workPackageEdit(WorkPackage $workPackage)
    {
        $projects = Project::all();
        $workPackage->load('project');
        
        return Inertia::render('Management/WorkPackageForm', [
            'workPackage' => $workPackage,
            'projects' => $projects
        ]);
    }

    public function workPackageUpdate(Request $request, WorkPackage $workPackage)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'wp_code' => 'required|string|max:50|unique:work_packages,wp_code,' . $workPackage->id,
            'wp_name' => 'required|string|max:255',
            'discipline_code' => 'required|string|max:50',
        ]);

        $workPackage->update($validated);

        return redirect()->route('workpackages.manage')
            ->with('success', 'Work Package updated successfully!');
    }

    public function workPackageDestroy(WorkPackage $workPackage)
    {
        $workPackage->delete();

        return redirect()->route('workpackages.manage')
            ->with('success', 'Work Package deleted successfully!');
    }

    // ==================== BOQ CRUD ====================
    
    public function boqIndex()
    {
        $boqs = Boq::with(['workPackage.project'])
            ->withCount(['progressEntries'])
            ->get();
        
        $workPackages = WorkPackage::with('project')->get();

        return Inertia::render('Management/BoqList', [
            'boqs' => $boqs,
            'workPackages' => $workPackages
        ]);
    }

    public function boqCreate()
    {
        $workPackages = WorkPackage::with('project')->get();
        return Inertia::render('Management/BoqForm', [
            'workPackages' => $workPackages
        ]);
    }

    public function boqStore(Request $request)
    {
        $validated = $request->validate([
            'work_package_id' => 'required|exists:work_packages,id',
            'boq_code' => 'required|string|unique:boqs,boq_code|max:50',
            'description' => 'required|string',
            'uom' => 'required|string|max:20',
            'budget_qty' => 'required|numeric|min:0',
            'unit_rate' => 'required|numeric|min:0',
        ]);

        Boq::create($validated);

        return redirect()->route('boqs.manage')
            ->with('success', 'BOQ created successfully!');
    }

    public function boqEdit(Boq $boq)
    {
        $workPackages = WorkPackage::with('project')->get();
        $boq->load('workPackage.project');
        
        return Inertia::render('Management/BoqForm', [
            'boq' => $boq,
            'workPackages' => $workPackages
        ]);
    }

    public function boqUpdate(Request $request, Boq $boq)
    {
        $validated = $request->validate([
            'work_package_id' => 'required|exists:work_packages,id',
            'boq_code' => 'required|string|max:50|unique:boqs,boq_code,' . $boq->id,
            'description' => 'required|string',
            'uom' => 'required|string|max:20',
            'budget_qty' => 'required|numeric|min:0',
            'unit_rate' => 'required|numeric|min:0',
        ]);

        $boq->update($validated);

        return redirect()->route('boqs.manage')
            ->with('success', 'BOQ updated successfully!');
    }

    public function boqDestroy(Boq $boq)
    {
        $boq->delete();

        return redirect()->route('boqs.manage')
            ->with('success', 'BOQ deleted successfully!');
    }

    // ==================== PROGRESS HISTORY ====================
    
    public function progressHistory(Boq $boq)
    {
        $boq->load([
            'workPackage.project',
            'progressEntries' => function($query) {
                $query->orderBy('progress_date', 'desc');
            }
        ]);

        // Calculate cumulative progress
        $entries = $boq->progressEntries->sortBy('progress_date')->values();
        $cumulative = 0;
        
        $entriesWithCumulative = $entries->map(function($entry) use (&$cumulative, $boq) {
            $cumulative += $entry->actual_qty;
            $progressPct = ($boq->budget_qty > 0) ? ($cumulative / $boq->budget_qty) * 100 : 0;
            
            return [
                'id' => $entry->id,
                'progress_date' => $entry->progress_date,
                'actual_qty' => $entry->actual_qty,
                'cumulative_qty' => $cumulative,
                'progress_pct' => min($progressPct, 100),
                'created_at' => $entry->created_at,
            ];
        });

        return Inertia::render('Management/ProgressHistory', [
            'boq' => $boq,
            'entries' => $entriesWithCumulative
        ]);
    }
}