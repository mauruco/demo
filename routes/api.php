<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['cors']], function () {

    Route::post('register', 'Auth\RegisterController@register');
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LoginController@logout');
    
    Route::group(['middleware' => 'auth:api'], function() {
        
        Route::post('course/', 'CourseController@create');
        Route::get('course/{id}', 'CourseController@retrive');
        Route::put('course/{id}', 'CourseController@update');
        Route::delete('course/{id}', 'CourseController@delete');
        Route::get('course/', 'CourseController@retriveall');
    });
});

