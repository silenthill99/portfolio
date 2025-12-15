<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Mail\MessageReceiveEmail;
use App\Mail\MessageSendMail;
use App\Models\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Message::class);

        $messages = Message::orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('messages/index', ['messages' => MessageResource::collection($messages)]);
    }

    public function create()
    {
        return Inertia::render('messages/contact');
    }

    public function store(StoreMessageRequest $request)
    {
        $data = $request->validated();
        $message = Message::create($data);

        try {
            Mail::to($data['email'])->send(new MessageSendMail);
            Mail::to(config('mail.admin'))->send(new MessageReceiveEmail($message));
        } catch (\Exception $e) {
            Log::error('Failed to send message emails', [
                'message_id' => $message->id,
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('messages.create')
                ->with('success', 'Votre message a été reçu, mais l\'envoi de la confirmation par email a échoué.');
        }

        return redirect()->route('messages.create')->with('success', 'Votre message a été envoyé avec succès !');
    }

    public function show(Message $message)
    {
        $this->authorize('view', $message);

        return Inertia::render('messages/show', compact('message'));
    }

    public function update(UpdateMessageRequest $request, Message $message)
    {
        $data = $request->validated();

        $message->update($data);

        return redirect()->route('messages.index')->with('success', 'Message mis à jour avec succès.');
    }

    public function destroy(Message $message)
    {
        $this->authorize('delete', $message);

        $message->delete();

        return redirect()->route('messages.index')->with('success', 'Message supprimé avec succès.');
    }
}
