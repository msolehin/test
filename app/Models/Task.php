<?php

namespace App\Models;

use Database\Factories\TaskFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'is_done'])]
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
            'is_done' => 'boolean',
        ];
    }

    /**
     * Order open tasks first, then by creation order.
     *
     * @param  Builder<Task>  $query
     * @return Builder<Task>
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('is_done')->orderBy('created_at')->orderBy('id');
    }
}
