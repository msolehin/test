<?php

namespace Tests\Feature;

use App\Models\Task;
use Database\Seeders\TaskSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_factory_creates_open_task()
    {
        $task = Task::factory()->create();

        $this->assertNotEmpty($task->title);
        $this->assertNull($task->completed_at);
        $this->assertFalse($task->isCompleted());
    }

    public function test_completed_state_sets_completed_at()
    {
        $task = Task::factory()->completed()->create();

        $this->assertNotNull($task->completed_at);
        $this->assertTrue($task->isCompleted());
    }

    public function test_seeder_creates_five_tasks()
    {
        $this->seed(TaskSeeder::class);

        $this->assertDatabaseCount('tasks', 5);
        $this->assertSame(2, Task::whereNotNull('completed_at')->count());
    }

    public function test_ordered_scope_lists_open_tasks_first()
    {
        $done = Task::factory()->completed()->create(['title' => 'Done']);
        $openOld = Task::factory()->create(['title' => 'Open old', 'created_at' => now()->subDay()]);
        $openNew = Task::factory()->create(['title' => 'Open new']);

        $this->assertSame(
            [$openNew->id, $openOld->id, $done->id],
            Task::ordered()->pluck('id')->all(),
        );
    }
}
