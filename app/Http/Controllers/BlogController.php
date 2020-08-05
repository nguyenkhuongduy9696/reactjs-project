<?php

namespace App\Http\Controllers;

use App\Model\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::orderBy('updated_at', 'desc')->get();
        return response()->json($blogs, 200);
    }
    public function add(Request $request)
    {
        $data = $request->all();
        $blog = Blog::create($data);
        return response()->json($blog, 200);
    }
    public function delete(Blog $blog)
    {
        $blog->delete();
        $blogs = Blog::orderBy('updated_at', 'desc')->get();
        return response()->json($blogs, 200);
    }
    public function show(Blog $blog)
    {
        return response()->json($blog, 200);
    }
    public function edit(Request $request, Blog $blog)
    {
        $data = $request->all();
        $blog->update($data);
        return response()->json($blog, 200);
    }
    public function new()
    {
        $blog = Blog::orderBy('created_at', 'desc')->take(1)->get();
        return response()->json($blog, 200);
    }
}
