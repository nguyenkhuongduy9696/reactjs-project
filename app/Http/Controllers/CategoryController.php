<?php

namespace App\Http\Controllers;

use App\Model\Category;
use App\Model\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $category = Category::orderBy('updated_at', 'desc')->get();
        return response()->json($category, 200);
    }
    public function add(Request $request)
    {
        $data = $request->all();
        $category = Category::create($data);
        return response()->json($category, 200);
    }
    public function delete(Category $category)
    {
        $category->delete();
        Product::where('cate_id', $category->id)->update(['cate_id' => 13]);
        $category = Category::orderBy('updated_at', 'desc')->get();
        return response()->json($category, 200);
    }
    public function show(Category $category)
    {
        $arr = [];
        $arr['cate'] = $category;
        $products = Product::where('cate_id', $category->id)->orderBy('updated_at', 'desc')->get();
        $arr['pro'] = $products;
        return response()->json($arr, 200);
    }
    public function edit(Request $request, Category $category)
    {
        $data = $request->all();
        $category->update($data);
        return response()->json($category, 200);
    }
}
