<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_shows_tasks(): void
    {
        Task::factory()->create(['title' => 'Buy milk']);
        Task::factory()->create(['title' => 'Walk dog']);

        $this->get('/tasks')->assertOk()->assertSee('Buy milk')->assertSee('Walk dog');
    }

    public function test_index_lists_open_tasks_before_done_tasks(): void
    {
        Task::factory()->create(['title' => 'Finished thing', 'is_done' => true]);
        Task::factory()->create(['title' => 'Open thing', 'is_done' => false]);

        $this->get('/tasks')->assertSeeInOrder(['Open thing', 'Finished thing']);
    }

    public function test_done_tasks_are_greyed_out(): void
    {
        Task::factory()->create(['is_done' => false]);
        $this->get('/tasks')->assertDontSee('task--done">', false);

        Task::factory()->create(['is_done' => true]);
        $this->get('/tasks')->assertSee('task task--done', false);
    }

    public function test_store_creates_task(): void
    {
        $this->post('/tasks', ['title' => 'New task'])->assertRedirect('/tasks');

        $this->assertDatabaseHas('tasks', ['title' => 'New task', 'is_done' => false]);
    }

    public function test_store_requires_title(): void
    {
        $this->post('/tasks', ['title' => ''])->assertSessionHasErrors('title');

        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_toggle_marks_open_task_done(): void
    {
        $task = Task::factory()->create(['is_done' => false]);

        $this->patch("/tasks/{$task->id}/toggle")->assertRedirect('/tasks');

        $this->assertTrue($task->fresh()->is_done);
    }

    public function test_toggle_marks_done_task_undone(): void
    {
        $task = Task::factory()->done()->create();

        $this->patch("/tasks/{$task->id}/toggle")->assertRedirect('/tasks');

        $this->assertFalse($task->fresh()->is_done);
    }

    public function test_update_changes_title(): void
    {
        $task = Task::factory()->create(['title' => 'Old title']);

        $this->patch("/tasks/{$task->id}", ['title' => 'New title'])->assertRedirect('/tasks');

        $this->assertSame('New title', $task->fresh()->title);
    }

    public function test_update_requires_title(): void
    {
        $task = Task::factory()->create(['title' => 'Old title']);

        $this->patch("/tasks/{$task->id}", ['title' => ''])->assertSessionHasErrors('title');

        $this->assertSame('Old title', $task->fresh()->title);
    }

    public function test_destroy_deletes_task(): void
    {
        $task = Task::factory()->create();

        $this->delete("/tasks/{$task->id}")->assertRedirect('/tasks');

        $this->assertModelMissing($task);
    }

    public function test_actions_on_missing_task_return_404(): void
    {
        $this->patch('/tasks/999/toggle')->assertNotFound();
        $this->patch('/tasks/999', ['title' => 'x'])->assertNotFound();
        $this->delete('/tasks/999')->assertNotFound();
    }
}
