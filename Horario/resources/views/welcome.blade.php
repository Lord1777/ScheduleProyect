<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <title>ASPS - CBI</title>
    <!-- <link rel="icon" href="{{ asset('resources/assets/icons/Iconosena.png') }}" type="image/png"> -->
    @viteReactRefresh
    @vite('resources/js/main.jsx')
</head>
<body>
    <div id="root"></div>
</body>
</html>