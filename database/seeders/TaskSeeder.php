<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Seed example tasks.
     */
    public function run(): void
    {
        Task::factory()->create(['title' => 'Buy groceries']);
        Task::factory()->create(['title' => 'Write project report']);
        Task::factory()->create(['title' => 'Call the dentist']);
        Task::factory()->done()->create(['title' => 'Water the plants']);
        Task::factory()->done()->create(['title' => 'Plan weekend trip']);
    }
}
