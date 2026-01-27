<!DOCTYPE html>
<html>
<head>
    <title>Input Progress - GEMS</title>
    <style>body { font-family: sans-serif; margin: 40px; line-height: 1.6; }</style>
</head>
<body>
    <h1>Input Progress BOQ</h1>
    <a href="/">« Kembali ke Dashboard</a>
    <hr>

    @if($errors->any())
        <div style="color: red;">{{ $errors->first() }}</div>
    @endif

    <form action="/progress/store" method="POST">
        @csrf
        <div>
            <label>Pilih BOQ:</label><br>
            <select name="boq_id" required>
                @foreach($boqs as $boq)
                    <option value="{{ $boq->id }}">{{ $boq->boq_code }} - {{ $boq->description }} (Budget: {{ $boq->budget_qty }})</option>
                @endforeach
            </select>
        </div><br>

        <div>
            <label>Tanggal Progress:</label><br>
            <input type="date" name="progress_date" required value="{{ date('Y-m-d') }}">
        </div><br>

        <div>
            <label>Actual Qty yang Selesai:</label><br>
            <input type="number" name="actual_qty" step="0.01" required>
        </div><br>

        <button type="submit" style="padding: 10px 20px; cursor: pointer;">Simpan Progress</button>
    </form>
</body>
</html>