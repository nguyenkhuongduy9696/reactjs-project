<?php

namespace App\Http\Controllers;

use App\Model\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::orderBy('created_at', 'desc')->get();
        return response()->json($category, 200);
    }
    public function delete(Category $category)
    {
        $category->delete();
        $category = Category::orderBy('created_at', 'desc')->get();
        return response()->json($category, 200);
    }
}
