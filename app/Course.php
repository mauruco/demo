<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['course', 'text', 'img'];

    public function categories()
    {
        return $this->belongsToMany('App\Category', 'courses_categories');
    }
}
