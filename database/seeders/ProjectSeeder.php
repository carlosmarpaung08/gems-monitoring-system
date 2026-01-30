<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\WorkPackage;
use App\Models\Boq;
use App\Models\ProgressEntry;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * PROJECT 1 - On Track
         */
        $project1 = Project::create([
            'project_code' => 'PRJ-GEMS-001',
            'project_name' => 'Engineering & Construction Project',
        ]);

        $wp1 = WorkPackage::create([
            'project_id' => $project1->id,
            'wp_code' => 'WP-CIV-001',
            'wp_name' => 'Civil Works',
            'discipline_code' => 'Civil',
        ]);

        $boq1 = Boq::create([
            'work_package_id' => $wp1->id,
            'boq_code' => 'BOQ-CIV-001',
            'description' => 'Excavation Works',
            'uom' => 'm3',
            'budget_qty' => 3000,
            'unit_rate' => 150,
        ]);

        $boq2 = Boq::create([
            'work_package_id' => $wp1->id,
            'boq_code' => 'BOQ-CIV-002',
            'description' => 'Concrete Works',
            'uom' => 'm3',
            'budget_qty' => 2000,
            'unit_rate' => 250,
        ]);

        ProgressEntry::create([
            'boq_id' => $boq1->id,
            'progress_date' => '2025-01-10',
            'actual_qty' => 800,
        ]);
        ProgressEntry::create([
            'boq_id' => $boq1->id,
            'progress_date' => '2025-02-10',
            'actual_qty' => 900,
        ]);
        ProgressEntry::create([
            'boq_id' => $boq2->id,
            'progress_date' => '2025-03-10',
            'actual_qty' => 600,
        ]);

        /**
         * PROJECT 2 - Stabil
         */
        $project2 = Project::create([
            'project_code' => 'PRJ-GEMS-002',
            'project_name' => 'Office Building Construction',
        ]);

        $wp2 = WorkPackage::create([
            'project_id' => $project2->id,
            'wp_code' => 'WP-ELE-001',
            'wp_name' => 'Electrical Installation',
            'discipline_code' => 'Electrical',
        ]);

        $boq3 = Boq::create([
            'work_package_id' => $wp2->id,
            'boq_code' => 'BOQ-ELE-001',
            'description' => 'Main Distribution Board',
            'uom' => 'unit',
            'budget_qty' => 1000,
            'unit_rate' => 500,
        ]);

        ProgressEntry::create([
            'boq_id' => $boq3->id,
            'progress_date' => '2025-03-01',
            'actual_qty' => 300,
        ]);
        ProgressEntry::create([
            'boq_id' => $boq3->id,
            'progress_date' => '2025-04-01',
            'actual_qty' => 250,
        ]);

        /**
         * PROJECT 3 - At Risk
         */
        $project3 = Project::create([
            'project_code' => 'PRJ-GEMS-003',
            'project_name' => 'Highway Infrastructure Development',
        ]);

        $wp3 = WorkPackage::create([
            'project_id' => $project3->id,
            'wp_code' => 'WP-RD-001',
            'wp_name' => 'Road Construction',
            'discipline_code' => 'Civil',
        ]);

        $boq4 = Boq::create([
            'work_package_id' => $wp3->id,
            'boq_code' => 'BOQ-RD-001',
            'description' => 'Asphalt Pavement',
            'uom' => 'm2',
            'budget_qty' => 5000,
            'unit_rate' => 120,
        ]);

        ProgressEntry::create([
            'boq_id' => $boq4->id,
            'progress_date' => '2025-02-01',
            'actual_qty' => 800,
        ]);
        ProgressEntry::create([
            'boq_id' => $boq4->id,
            'progress_date' => '2025-05-01',
            'actual_qty' => 600,
        ]);

        /**
         * PROJECT 4 - Completed
         */
        $project4 = Project::create([
            'project_code' => 'PRJ-GEMS-004',
            'project_name' => 'Residential Complex - Phase 1',
        ]);

        $wp4 = WorkPackage::create([
            'project_id' => $project4->id,
            'wp_code' => 'WP-BLD-001',
            'wp_name' => 'Building Construction',
            'discipline_code' => 'Civil',
        ]);

        $boq5 = Boq::create([
            'work_package_id' => $wp4->id,
            'boq_code' => 'BOQ-BLD-001',
            'description' => 'Complete Building Structure',
            'uom' => 'ls',
            'budget_qty' => 1000,
            'unit_rate' => 500,
        ]);

        ProgressEntry::create([
            'boq_id' => $boq5->id,
            'progress_date' => '2024-12-01',
            'actual_qty' => 1000,
        ]);

    }
}