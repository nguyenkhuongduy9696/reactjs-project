<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table="products";
    protected $fillable = ['name', 'image','quantity','short_desc', 'price', 'detail', 'cate_id'];
}
