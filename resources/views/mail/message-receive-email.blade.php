<x-mail::message>
# Introduction

Nouveau message de : {{$message->pseudo}}

Adresse mail : {{$message->email}}

______

{{$message->message}}

<x-mail::button :url="''">
Button Text
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
