<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(['middleware' => ['auth'], 'prefix' => 'dashboard', 'as' => 'dashboard::'], function () {
    Route::get('/', ['as' => 'index', 'uses' => 'Dashboard\DashboardController@index']);

    Route::group(['prefix' => 'category', 'as' => 'category.'], function () {
        Route::get('/index', ['as' => 'index', 'uses' => 'Dashboard\CategoryController@index']);
        Route::get('/create', ['as' => 'create', 'uses' => 'Dashboard\CategoryController@create']);
        Route::post('/save', ['as' => 'save', 'uses' => 'Dashboard\CategoryController@save']);
        Route::get('/edit/{id}', ['as' => 'edit', 'uses' => 'Dashboard\CategoryController@edit']);
        Route::post('/update/{id}', ['as' => 'update', 'uses' => 'Dashboard\CategoryController@update']);
        Route::get('/delete/{id}', ['as' => 'delete', 'uses' => 'Dashboard\CategoryController@delete']);
    });

    Route::group(['prefix' => 'post', 'as' => 'post.'], function () {
        Route::get('/index', ['as' => 'index', 'uses' => 'Dashboard\PostController@index']);
        Route::get('/create', ['as' => 'create', 'uses' => 'Dashboard\PostController@create']);
        Route::post('/save', ['as' => 'save', 'uses' => 'Dashboard\PostController@save']);
        Route::get('/edit/{id}', ['as' => 'edit', 'uses' => 'Dashboard\PostController@edit']);
        Route::post('/update/{id}', ['as' => 'update', 'uses' => 'Dashboard\PostController@update']);
        Route::get('/delete/{id}', ['as' => 'delete', 'uses' => 'Dashboard\PostController@delete']);
    });
});
