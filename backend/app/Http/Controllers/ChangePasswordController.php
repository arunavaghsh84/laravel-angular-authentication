<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use App\User;

class ChangePasswordController extends Controller
{
    public function process(ResetPasswordRequest $request) {
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    public function getPasswordResetTableRow($request) {
        return DB::table('password_resets')->where('token', $request->reset_token);
    }

    public function tokenNotFoundResponse() {
        return response()->json(['errors' => ['reset_token' => 'Token is invalid.']], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function changePassword($request) {
        $getToken = $this->getPasswordResetTableRow($request)->first();
        $user = User::where('email', $getToken->email)->first();
        $user->update(['password' => $request->password]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json(['success' => 'Password changed successfully.'], Response::HTTP_CREATED);
    }
}
