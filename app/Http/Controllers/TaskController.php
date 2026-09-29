<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Show the task list, open tasks first.
     */
    public function index(): Response
    {
        return Inertia::render('tasks/index', [
            'tasks' => Task::query()->ordered()->get(['id', 'title', 'completed_at', 'created_at']),
        ]);
    }

    /**
     * Create a new task.
     */
    public function store(TaskRequest $request): RedirectResponse
    {
        Task::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Task added.')]);

        return to_route('tasks.index');
    }

    /**
     * Update the task's title.
     */
    public function update(TaskRequest $request, Task $task): RedirectResponse
    {
        $task->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Task updated.')]);

        return to_route('tasks.index');
    }

    /**
     * Mark the task as done, or reopen it.
     */
    public function toggle(Task $task): RedirectResponse
    {
        $task->update(['completed_at' => $task->isCompleted() ? null : now()]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $task->isCompleted() ? __('Task marked as done.') : __('Task reopened.'),
        ]);

        return to_route('tasks.index');
    }

    /**
     * Delete the task.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Task deleted.')]);

        return to_route('tasks.index');
    }
}
