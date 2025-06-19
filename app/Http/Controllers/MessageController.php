<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index() {
        return Inertia::render('contact');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pseudo' => 'required|string|max:255',
            'email' => "required|email",
            'subject' => "required|string|max:255",
            'message' => "required|string"
        ]);
        Message::create($data);
        return Inertia::render('contact');
    }

    public function show(Message $message)
    {
        return $message;
    }

    public function update(Request $request, Message $message)
    {
        $data = $request->validate([

        ]);

        $message->update($data);

        return $message;
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return response()->json();
    }
}
