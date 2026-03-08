<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

use App\Http\Controllers\ItemController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::resource('items', ItemController::class);

require __DIR__.'/settings.php';
