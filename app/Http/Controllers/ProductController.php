<?php

namespace App\Http\Controllers;

use App\Model\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('updated_at', 'desc')->get();
        return response()->json($products, 200);
    }
    public function delete(Product $product)
    {
        $product->delete();
        $products = Product::orderBy('updated_at', 'desc')->get();
        return response()->json($products, 200);
    }
    public function add(Request $request)
    {
        $data = $request->all();
        $product = Product::create($data);
        return response()->json($product, 200);
    }
    public function show(Product $product)
    {
        return response()->json($product, 200);
    }
    public function edit(Request $request, Product $product)
    {
        $data = $request->all();
        $product->update($data);
        return response()->json($product, 200);
    }
    public function new()
    {
        $products = Product::orderBy('updated_at', 'desc')->take(6)->get();
        return response()->json($products, 200);
    }
    public function relate(Product $product)
    {
        $pros = Product::where('cate_id', $product->cate_id)->where('id', '!=', $product->id)->take(3)->get();
        return response()->json($pros, 200);
    }
    public function page()
    {
        $pro = Product::orderBy('updated_at', 'desc')->paginate(6);
        return response()->json($pro, 200);
    }
    public function search($search)
    {
        $products = Product::where('name', 'LIKE', '%' . $search . '%')->get();
        return response()->json($products, 200);
    }
}
