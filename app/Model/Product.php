<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table="products";
    protected $fillable = ['name', 'image','quantity', 'price', 'detail', 'cate_id'];
}
