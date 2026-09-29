<?php

namespace Tests\Feature;

use App\Models\Task;
use Database\Seeders\TaskSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_factory_creates_open_and_done_tasks(): void
    {
        $open = Task::factory()->create();
        $done = Task::factory()->done()->create();

        $this->assertFalse($open->fresh()->is_done);
        $this->assertTrue($done->fresh()->is_done);
        $this->assertDatabaseCount('tasks', 2);
    }

    public function test_seeder_creates_five_tasks(): void
    {
        $this->seed(TaskSeeder::class);

        $this->assertSame(5, Task::count());
        $this->assertSame(3, Task::where('is_done', false)->count());
        $this->assertSame(2, Task::where('is_done', true)->count());
    }

    public function test_ordered_scope_lists_open_tasks_first(): void
    {
        $done = Task::factory()->done()->create();
        $open = Task::factory()->create();

        $ids = Task::ordered()->pluck('id')->all();

        $this->assertSame([$open->id, $done->id], $ids);
    }
}
