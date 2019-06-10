<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendPasswordResetLink;
use App\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{

    public function request(Request $request) {
        if (!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }
        return $this->successResponse($request->email);
    }

    public function validateEmail($email) {
        return !!User::where('email', $email)->first();
    }

    public function failedResponse() {
        return response()->json([
            'error' => 'Email doesn\'t found in our database.'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse($email) {
        $this->send($email);
        return response()->json([
            'success' => 'Password reset link has been sent successfully. Please check your email.'
        ], Response::HTTP_OK);
    }

    public function send($email) {
        $token = $this->createToken($email);
        Mail::to($email)->send(new SendPasswordResetLink($token));
    }

    public function createToken($email) {
        $getToken = DB::table('password_resets')->where('email', $email)->first();
        if ($getToken) {
            return $getToken->token;
        }
        $token = str_random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    public function saveToken($token, $email) {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

}
