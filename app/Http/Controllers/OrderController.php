<?php

namespace App\Http\Controllers;

use App\Model\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function add(Request $request)
    {
        $data = $request->all();
        $order = Order::create($data);
        return response()->json($order, 200);
    }
}
