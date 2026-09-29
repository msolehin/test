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
        $tasks = [
            'Buy groceries' => false,
            'Write project proposal' => false,
            'Call the dentist' => false,
            'Plan team meeting' => true,
            'Read a chapter of a book' => true,
        ];

        foreach ($tasks as $title => $done) {
            $factory = Task::factory();

            if ($done) {
                $factory = $factory->completed();
            }

            $factory->create(['title' => $title]);
        }
    }
}
