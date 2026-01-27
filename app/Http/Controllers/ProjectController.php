<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\Boq;
use App\Models\ProgressEntry;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        // Mengambil semua data project beserta relasinya
        $projects = Project::with(['workPackages.boqs.progressEntries'])->get();

        foreach ($projects as $project) {
            $projectTotalAmount = 0;
            $projectWeightedProgressSum = 0;

            foreach ($project->workPackages as $wp) {
                $wpTotalAmount = 0;
                $wpWeightedProgressSum = 0;

                foreach ($wp->boqs as $boq) {
                    // 1. Hitung BOQ Amount (Budget Qty * Unit Rate)
                    $boq->amount = $boq->budget_qty * $boq->unit_rate;

                    // 2. Hitung Total Actual Qty dari semua entry progress
                    $totalActualQty = $boq->progressEntries->sum('actual_qty');
                    
                    // Validasi: Progress tidak boleh > 100% (Actual tidak boleh > Budget)
                    $boq->actual_qty = min($totalActualQty, $boq->budget_qty);

                    // 3. Hitung BOQ Progress (%)
                    $boq->progress_pct = ($boq->budget_qty > 0) 
                        ? ($boq->actual_qty / $boq->budget_qty) * 100 
                        : 0;

                    // Akumulasi untuk hitung WP
                    $wpTotalAmount += $boq->amount;
                    $wpWeightedProgressSum += ($boq->progress_pct / 100) * $boq->amount;
                }

                // 4. Hitung WP Progress (%) - Cost Weighted
                $wp->total_amount = $wpTotalAmount;
                $wp->progress_pct = ($wpTotalAmount > 0) 
                    ? ($wpWeightedProgressSum / $wpTotalAmount) * 100 
                    : 0;

                // Akumulasi untuk hitung Project
                $projectTotalAmount += $wp->total_amount;
                $projectWeightedProgressSum += ($wp->progress_pct / 100) * $wp->total_amount;
            }

            // 5. Hitung Overall Project Progress (%)
            $project->total_contract_value = $projectTotalAmount;
            $project->overall_progress_pct = ($projectTotalAmount > 0) 
                ? ($projectWeightedProgressSum / $projectTotalAmount) * 100 
                : 0;
        }

        // Return using Inertia instead of blade view
        return Inertia::render('ProjectDashboard', [
            'projects' => $projects
        ]);
    }

    public function createProgress()
    {
        $boqs = Boq::with('progressEntries')->get();
        
        // Return using Inertia
        return Inertia::render('CreateProgress', [
            'boqs' => $boqs
        ]);
    }

    public function storeProgress(Request $request)
    {
        $request->validate([
            'boq_id' => 'required|exists:boqs,id',
            'progress_date' => 'required|date',
            'actual_qty' => 'required|numeric|min:0',
        ]);

        $boq = Boq::with('progressEntries')->find($request->boq_id);
        $currentProgress = $boq->progressEntries->sum('actual_qty');
        $remainingBudget = $boq->budget_qty - $currentProgress;

        // Validasi: actual_qty tidak boleh > budget_qty 
        if ($request->actual_qty > $remainingBudget) {
            return back()->withErrors([
                'actual_qty' => "Input gagal! Sisa budget untuk BOQ ini hanya {$remainingBudget}."
            ]);
        }

        ProgressEntry::create($request->all());

        return redirect('/')->with('success', 'Progress berhasil ditambahkan!');
    }
}