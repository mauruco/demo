<?php

use Illuminate\Database\Seeder;

class CoursesCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses_categories')->insert([
            'course_id' => 1,
            'category_id' => 1,
        ]);

        DB::table('courses_categories')->insert([
            'course_id' => 1,
            'category_id' => 2,
        ]);

        DB::table('courses_categories')->insert([
            'course_id' => 1,
            'category_id' => 3,
        ]);
    }
}
