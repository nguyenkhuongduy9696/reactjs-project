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
    Route::post('', 'CategoryController@add')->name('add');
    Route::post('delete/{category}', 'CategoryController@delete')->name('delete');
    Route::get('{category}', 'CategoryController@show')->name('show');
    Route::post('{category}', 'CategoryController@edit')->name('edit');
});
Route::prefix('products')->name('products.')->group(function () {
    Route::get('', 'ProductController@index')->name('index');
    Route::post('', 'ProductController@add')->name('add');
    Route::post('delete/{product}', 'ProductController@delete')->name('delete');
    Route::get('{product}', 'ProductController@show')->name('show');
    Route::post('{product}', 'ProductController@edit')->name('edit');
});
Route::prefix('blogs')->name('blogs.')->group(function () {
    Route::get('', 'BlogController@index')->name('index');
    Route::post('', 'BlogController@add')->name('add');
    Route::post('delete/{blog}', 'BlogController@delete')->name('delete');
    Route::get('{blog}', 'BlogController@show')->name('show');
    Route::post('{blog}', 'BlogController@edit')->name('edit');
});
Route::prefix('contact')->name('contact.')->group(function () {
    Route::post('', 'ContactController@add')->name('add');
    Route::get('', 'ContactController@index')->name('index');
});
Route::prefix('orders')->name('orders.')->group(function () {
    Route::post('', 'OrderController@add')->name('add');
    Route::get('', 'OrderController@index')->name('index');
    Route::get('/{order}', 'OrderController@show')->name('show');
    Route::post('update/{order}', 'OrderController@update')->name('update');
});
Route::post('order-detail', 'OrderController@detail')->name('order-detail');
Route::get('getPro/{order}', 'OrderController@getPro')->name('getPro');
Route::get('new-products', 'ProductController@new')->name('new-product');
Route::get('new-blog', 'BlogController@new')->name('new-blog');
Route::get('relate-product/{product}', 'ProductController@relate')->name('relate-product');
Route::get('productPage', 'ProductController@page')->name('productPage');
Route::get('categoryPage', 'CategoryController@page')->name('categoryPage');
Route::get('blogPage', 'BlogController@page')->name('blogPage');
Route::get('search/{search}', 'ProductController@search')->name('search-product');
