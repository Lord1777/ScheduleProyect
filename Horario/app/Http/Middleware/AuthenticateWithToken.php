<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateWithToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    protected $except = [
        'login',
        '/login',
    ];
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar si el token de acceso está presente en la solicitud
        if (!$request->bearerToken()) {
            return response()->json(['message' => 'Unauthorized: Access token required'], 401);
        }

        return $next($request);
    }
}
