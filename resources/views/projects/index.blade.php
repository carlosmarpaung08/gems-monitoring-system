<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>GEMS - Project Progress</title>
    <style>
        body { font-family: sans-serif; margin: 40px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #f4f4f4; }
        .summary { background-color: #e9ecef; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Project Monitoring (GEMS)</h1>

    <a href="/progress/create" style="display: inline-block; padding: 10px; background: blue; color: white; text-decoration: none; border-radius: 5px; margin-bottom: 20px;">
        + Tambah Progress Baru
    </a>

    @foreach($projects as $project)
        <h3>Project: {{ $project->project_code }} - {{ $project->project_name }}</h3>
        
        @foreach($project->workPackages as $wp)
            <h4>Work Package: {{ $wp->wp_code }} ({{ $wp->discipline_code }})</h4>
            <table>
                <thead>
                    <tr>
                        <th>BOQ Code</th>
                        <th>Description</th>
                        <th>Budget Qty</th>
                        <th>Actual Qty</th>
                        <th>Progress (%)</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($wp->boqs as $boq)
                    <tr>
                        <td>{{ $boq->boq_code }}</td>
                        <td>{{ $boq->description }}</td>
                        <td>{{ number_format($boq->budget_qty, 0) }} {{ $boq->uom }}</td>
                        <td>{{ number_format($boq->actual_qty, 0) }}</td>
                        <td>{{ number_format($boq->progress_pct, 2) }}%</td>
                        <td>{{ number_format($boq->amount, 0) }}</td>
                    </tr>
                    @endforeach
                    <tr class="summary">
                        <td colspan="4" style="text-align: right;">WP Progress (Cost Weighted):</td>
                        <td>{{ number_format($wp->progress_pct, 2) }}%</td>
                        <td>{{ number_format($wp->total_amount, 0) }}</td>
                    </tr>
                </tbody>
            </table>
        @endforeach

        <div style="padding: 20px; border: 2px solid #333; background: #f9f9f9;">
            <strong>Project Summary:</strong><br>
            Project Code: {{ $project->project_code }} <br>
            Total Contract Value: {{ number_format($project->total_contract_value, 0) }} <br>
            <strong>Overall Progress: {{ number_format($project->overall_progress_pct, 2) }}%</strong>
        </div>
        <hr>
    @endforeach
</body>
</html>