<?php

namespace App\Http\Controllers;

use App\Model\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function add(Request $request)
    {
        $data = $request->all();
        $contact = Contact::create($data);
        return response()->json($contact, 200);
    }
    public function index()
    {
        $contact = Contact::orderBy('created_at', 'desc')->paginate(4);
        return response()->json($contact, 200);
    }
}
