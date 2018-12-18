<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        DB::table('categories')->insert([
            'category' => 'A distância',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('categories')->insert([
            'category' => 'Técnico',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('categories')->insert([
            'category' => 'Expecialização',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        // INSERT INTO `desenv`.`categories` (id, category) VALUES (1, "A distância");
        // INSERT INTO `desenv`.`categories` (id, category) VALUES (2, "Técnico");
        // INSERT INTO `desenv`.`categories` (id, category) VALUES (3, "Expecialização");
    }
}
