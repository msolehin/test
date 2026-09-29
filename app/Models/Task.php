<?php

namespace App\Models;

use Database\Factories\TaskFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property Carbon|null $completed_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['title', 'completed_at'])]
class Task extends Model
{
    /** @use HasFactory<TaskFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'completed_at' => 'datetime',
        ];
    }

    public function isCompleted(): bool
    {
        return $this->completed_at !== null;
    }

    /**
     * Open tasks first (newest first), then done tasks (most recently completed first).
     *
     * @param  Builder<Task>  $query
     * @return Builder<Task>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderByRaw('completed_at IS NOT NULL')
            ->orderByDesc('completed_at')
            ->orderByDesc('created_at')
            ->orderByDesc('id');
    }
}
