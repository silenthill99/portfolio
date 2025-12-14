<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Mail\MessageReceiveEmail;
use App\Mail\MessageSendMail;
use App\Models\Message;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Message::class);

        $messages = Message::orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('messages/index', compact('messages'));
    }

    public function create()
    {
        return Inertia::render('messages/contact');
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        $message = Message::create($data);

//        Mail::to($data['email'])->send(new MessageSendMail());
        Mail::to('florian.graziani@sfr.fr')->send(new MessageReceiveEmail($message));

        return redirect()->route('contact.create')->with('success', 'Votre message a été envoyé avec succès !');
    }

    public function show(Message $message)
    {
        $this->authorize('view', $message);

        dd($message->all());

//        return $message;
    }

    public function update(UpdateMessageRequest $request, Message $message)
    {
        $data = $request->validated();

        $message->update($data);

        return redirect()->route('contact.index')->with('success', 'Message mis à jour avec succès.');
    }

    public function destroy(Message $message)
    {
        $this->authorize('delete', $message);

        $message->delete();

        return redirect()->route('contact.index')->with('success', 'Message supprimé avec succès.');
    }
}
