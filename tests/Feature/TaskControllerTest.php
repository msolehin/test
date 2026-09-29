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
}
