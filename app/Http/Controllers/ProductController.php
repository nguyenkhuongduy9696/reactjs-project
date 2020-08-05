<?php

namespace App\Http\Controllers;

use App\Model\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json($products, 200);
    }
    public function delete(Product $product)
    {
        $product->delete();
        $products = Product::orderBy('created_at', 'desc')->get();
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
        $products = Product::orderBy('created_at', 'desc')->take(8)->get();
        return response()->json($products, 200);
    }
}
