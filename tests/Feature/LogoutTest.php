<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class LogoutTest extends TestCase
{
    public function testUserIsLoggedOutProperly()
    {
        $user = User::where('email','admin@admin.com.br')->first();
        if($user) $user->delete();

        $user = factory(User::class)->create(['email' => 'admin@admin.com.br']);
        $token = $user->generateToken();
        $headers = ['Authorization' => "Bearer $token"];

        $this->json('get', '/api/course', [], $headers)->assertStatus(200);
        $this->json('post', '/api/logout', [], $headers)->assertStatus(200);

        $user = User::find($user->id);
        $this->assertEquals(null, $user->api_token);

        $user = User::where('email','admin@admin.com.br')->first();
        if($user) $user->delete();
    }

    public function testUserWithNullToken()
    {
        $this->json('get', '/api/course', [], [])->assertStatus(401);
    }
}