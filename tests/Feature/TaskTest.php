<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    private function signIn(): void
    {
        $this->actingAs(User::factory()->create());
    }

    public function test_guests_are_redirected_to_login()
    {
        $task = Task::factory()->create();

        $this->get(route('tasks.index'))->assertRedirect(route('login'));
        $this->post(route('tasks.store'), ['title' => 'x'])->assertRedirect(route('login'));
        $this->patch(route('tasks.update', $task), ['title' => 'x'])->assertRedirect(route('login'));
        $this->patch(route('tasks.toggle', $task))->assertRedirect(route('login'));
        $this->delete(route('tasks.destroy', $task))->assertRedirect(route('login'));
    }

    public function test_index_lists_open_tasks_before_done_tasks()
    {
        $this->signIn();
        $done = Task::factory()->create(['completed_at' => now()]);
        $open = Task::factory()->create(['completed_at' => null]);

        $this->get(route('tasks.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('tasks/index')
                ->has('tasks', 2)
                ->where('tasks.0.id', $open->id)
                ->where('tasks.1.id', $done->id));
    }

    public function test_user_can_create_task()
    {
        $this->signIn();

        $this->post(route('tasks.store'), ['title' => 'Buy milk'])
            ->assertRedirect(route('tasks.index'));

        $this->assertDatabaseHas('tasks', ['title' => 'Buy milk', 'completed_at' => null]);
    }

    public function test_title_is_required_when_creating()
    {
        $this->signIn();

        $this->post(route('tasks.store'), ['title' => ''])->assertSessionHasErrors('title');

        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_title_max_length()
    {
        $this->signIn();

        $this->post(route('tasks.store'), ['title' => str_repeat('a', 256)])->assertSessionHasErrors('title');

        $this->assertDatabaseCount('tasks', 0);
    }

    public function test_user_can_update_task_title()
    {
        $this->signIn();
        $task = Task::factory()->create();

        $this->patch(route('tasks.update', $task), ['title' => 'New title'])
            ->assertRedirect(route('tasks.index'));

        $this->assertSame('New title', $task->fresh()->title);
    }

    public function test_title_is_required_when_updating()
    {
        $this->signIn();
        $task = Task::factory()->create(['title' => 'Original']);

        $this->patch(route('tasks.update', $task), ['title' => ''])->assertSessionHasErrors('title');

        $this->assertSame('Original', $task->fresh()->title);
    }

    public function test_user_can_mark_task_done()
    {
        $this->signIn();
        $task = Task::factory()->create(['completed_at' => null]);

        $this->patch(route('tasks.toggle', $task))->assertRedirect(route('tasks.index'));

        $this->assertNotNull($task->fresh()->completed_at);
    }

    public function test_user_can_mark_task_undone()
    {
        $this->signIn();
        $task = Task::factory()->create(['completed_at' => now()]);

        $this->patch(route('tasks.toggle', $task))->assertRedirect(route('tasks.index'));

        $this->assertNull($task->fresh()->completed_at);
    }

    public function test_user_can_delete_task()
    {
        $this->signIn();
        $task = Task::factory()->create();

        $this->delete(route('tasks.destroy', $task))->assertRedirect(route('tasks.index'));

        $this->assertModelMissing($task);
    }

    public function test_update_toggle_delete_return_404_for_missing_task()
    {
        $this->signIn();

        $this->patch(route('tasks.update', 999), ['title' => 'x'])->assertNotFound();
        $this->patch(route('tasks.toggle', 999))->assertNotFound();
        $this->delete(route('tasks.destroy', 999))->assertNotFound();
    }
}
