<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::controller(TaskController::class)->group(function () {
        Route::get('tasks', 'index')->name('tasks.index');
        Route::post('tasks', 'store')->name('tasks.store');
        Route::patch('tasks/{task}', 'update')->name('tasks.update');
        Route::patch('tasks/{task}/toggle', 'toggle')->name('tasks.toggle');
        Route::delete('tasks/{task}', 'destroy')->name('tasks.destroy');
    });
});

require __DIR__.'/settings.php';
