<?php

namespace App\Http\Controllers;

use App\Model\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $order = Order::orderBy('created_at', 'desc')->get();
        return response()->json($order, 200);
    }
    public function add(Request $request)
    {
        $data = $request->all();
        $order = Order::create($data);
        return response()->json($order, 200);
    }
    public function detail(Request $request)
    {
        $data = $request->all();
        $item = DB::table('order_detail')->insert($data);
        return response()->json($item, 200);
    }
    public function show(Order $order)
    {
        return response()->json($order, 200);
    }
    public function getPro(Order $order)
    {
        $data = DB::table('order_detail')->where('order_id', $order->id)->get();
        return response()->json($data, 200);
    }
}
