<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{

    public function index()
    {
        $messages = Message::all();
        return Inertia::render("messages/index", compact("messages"));
    }

    public function create() {
        return Inertia::render('messages/contact');
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        Message::create($data);
        return Inertia::render('messages/contact');
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
