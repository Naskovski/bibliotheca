@php
    $bookEdition = $lease->bookCopy->bookEdition;
    $book = $bookEdition->book;
    $author = $book->author;
    $coverUrl = $bookEdition->photo_url ?? 'https://via.placeholder.com/120x180?text=No+Image';
    $statusColors = [
        'requested' => '#3490dc',
        'approved' => '#38c172',
        'collected' => '#6c63ff',
        'overdue' => '#ff9800',
        'returned' => '#4caf50',
        'cancelled' => '#e3342f',
    ];
    $status = ucfirst($lease->status);
    $statusColor = $statusColors[$lease->status] ?? '#333';
@endphp

    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Lease Status Updated</title>
</head>
<body style="background: #f7fafc; font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 0; padding: 0;">
<div style="max-width: 580px; margin: 32px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px #0001; overflow: hidden;">
    <div style="background: #22223b; color: #fff; padding: 24px 32px 16px 32px;">
        <h1 style="margin: 0 0 8px 0; font-size: 2rem; font-weight: 700; letter-spacing: 1px; color: #efefef;">
            Lease Status Updated
        </h1>
        <p style="margin: 0; font-size: 1.1rem; font-weight: 400;">
            Hello {{ $lease->client->name }},
        </p>
    </div>
    <div style="padding: 32px;">
        <div style="display: flex; align-items: flex-start; gap: 24px;">
            <img src="{{ $coverUrl }}" alt="Book Cover" style="width: 120px; height: 180px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px #0002; margin-right: 8px">
            <div>
                <div style="font-size: 1.2rem; font-weight: 600; color: #22223b; margin-bottom: 4px;">
                    {{ $book->title }}
                </div>
                <div style="font-size: 1rem; color: #4a5568; margin-bottom: 12px;">
                    by <span style="font-weight: 500;">{{ $author->name }}</span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span style="font-size: 0.95rem; color: #6c757d;">ISBN:</span>
                    <span style="font-size: 0.95rem; color: #333;">{{ $bookEdition->isbn }}</span>
                </div>
                <div style="margin-bottom: 16px;">
                    <span style="font-size: 1.1rem; font-weight: 500;">Your lease status is now:</span><br>
                    <span style="display: inline-block; margin-top: 6px; padding: 6px 18px; border-radius: 20px; background: {{ $statusColor }}; color: #fff; font-size: 1.1rem; font-weight: 700; letter-spacing: 1px;">
                            {{ $status }}
                        </span>
                </div>
            </div>
        </div>
        <p style="margin-top: 32px; font-size: 1rem; color: #444;">
            If you have any questions, please contact the library staff.<br>
            Thank you for using <span style="font-weight: 600;">{{ config('app.name') }}</span>!
        </p>
    </div>
    <div style="background: #22223b; color: #fff; text-align: center; padding: 16px 0; font-size: 0.95rem;">
        &copy; {{ date('Y') }} {{ config('app.name') }}
    </div>
</div>
</body>
</html>
