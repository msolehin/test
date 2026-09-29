<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tasks</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
        ul { list-style: none; padding: 0; }
        .task { display: flex; align-items: center; gap: .5rem; padding: .5rem 0; border-bottom: 1px solid #e5e7eb; }
        .task--done { color: #9ca3af; text-decoration: line-through; }
        .error { color: #b91c1c; }
    </style>
</head>
<body>
    <h1>Tasks</h1>

    <form method="POST" action="{{ route('tasks.store') }}">
        @csrf
        <input type="text" name="title" value="{{ old('title') }}" placeholder="New task" required>
        <button type="submit">Add task</button>
        @error('title')
            <p class="error">{{ $message }}</p>
        @enderror
    </form>

    @if ($tasks->isEmpty())
        <p>No tasks yet.</p>
    @else
        <ul>
            @foreach ($tasks as $task)
                <li class="task {{ $task->is_done ? 'task--done' : '' }}">
                    <span class="task__title">{{ $task->title }}</span>
                    {{-- Row actions (toggle, edit, delete) are added in the next task. --}}
                </li>
            @endforeach
        </ul>
    @endif
</body>
</html>
