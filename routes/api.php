<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('category')->name('category.')->group(function () {
    Route::get('', 'CategoryController@index')->name('index');
    Route::post('delete/{category}', 'CategoryController@delete')->name('delete');
    Route::get('{category}', 'CategoryController@show')->name('show');
});
Route::prefix('products')->name('products.')->group(function () {
    Route::get('', 'ProductController@index')->name('index');
    Route::post('', 'ProductController@add')->name('add');
    Route::post('delete/{product}', 'ProductController@delete')->name('delete');
    Route::get('{product}', 'ProductController@show')->name('show');
    Route::post('{product}', 'ProductController@edit')->name('edit');
});
Route::get('new-products', 'ProductController@new')->name('new-product');
