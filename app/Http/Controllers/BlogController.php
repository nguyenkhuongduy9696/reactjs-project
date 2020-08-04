<?php

namespace App\Http\Controllers;

use App\Model\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::orderBy('created_at', 'desc')->get();
        return response()->json($blogs, 200);
    }
    public function add(Request $request)
    {
        $data = $request->all();
        $blog = Blog::create($data);
        return response()->json($blog, 200);
    }
}
