<!DOCTYPE html>
<!--suppress HtmlUnknownAttribute -->
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ $title ?? config('app.name', 'Laravel') }}</title>
        <meta name="description" content="{{ $description ?? 'Portfolio' }}">

        <link rel="icon" href="{{asset("/favicon.ico")}}" sizes="any">
        <link rel="icon" href="{{asset("/favicon.svg")}}" type="image/svg+xml">
        <link rel="apple-touch-icon" href="{{asset("/apple-touch-icon.png")}}">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased min-h-screen bg-gray-800 ">
        @inertia
    </body>
</html>
