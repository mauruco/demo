<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => '$2y$10$CAg.F/hbgayKQRHY6lUp6epUHe/pBLW9c9xz8UMhJLbq72p.vE5ha',
            'api_token' => 'jpBRZMmuVifUEBLB1MaUB8d3bdGkF7UwcOWSXmWz3ThlBL8d8YzAj6Cfskqk'
        ]);
    }
}
