<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class LoginTest extends TestCase
{
    public function testRequiresEmailAndLogin()
    {
        $this->json('POST', 'api/login')
            ->assertStatus(422);
    }

    public function testUserLoginsSuccessfully()
    {
        $user = User::where('email','admin@admin.com.br')->first();
        if($user) $user->delete();

        $user = factory(User::class)->create([
            'email' => 'admin@admin.com.br',
            'password' => bcrypt('123qwe.'),
        ]);

        $payload = ['email' => 'admin@admin.com.br', 'password' => '123qwe.'];

        $this->json('POST', 'api/login', $payload)
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                    'api_token',
                ],
            ]);

        $user = User::where('email','admin@admin.com.br')->first();
        if($user) $user->delete();
    }
}
