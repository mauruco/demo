<?php

namespace App\Http\Controllers;

use \Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Course;
use App\Category;

class CourseController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();

        try{
            
            $course = new Course($data);
            $course->save();
            if($request->get('categories')) {
    
                $cats = $request->get('categories');

                foreach($cats as $cat)
                    $course->categories()->attach($cat);
            }
        }catch(QueryException $error) {

            // silêncio é ouro
            return Response('', 422);
        }

        // silêncio é ouro
        return Response('', 201);
    }

    public function retrive($id, Request $request)
    {
        $course = Course::find($id);
        
        if(!$course)
            return Response('', 404);

        $course->categories;
        
        return Response()->json($course, 200);
    }

    public function update($id, Request $request)
    {

        $data = $request->all();
        $course = Course::find($id);
        
        if(!$course)
            return Response('', 404);

        // só altere oque eu deixo
        $updatetable = ['course', 'text'];

        foreach($updatetable as $letMeUpdate) {

            if(!isset($data[$letMeUpdate]))
                continue;

            $course->update([$letMeUpdate => $data[$letMeUpdate]]);
        }

        if($request->get('categories')) {

            $course->categories()->detach();
            $cats = $request->get('categories');

            foreach($cats as $cat)
                $course->categories()->attach($cat);
        }

        // silêncio é ouro
        return Response('', 204);
    }
    
    public function delete($id)
    {
        $course = Course::find($id);
        
        if(!$course)
            return Response('', 404);

        $course->delete();

        return Response('', 204);
    }

    public function retriveAll()
    {
        $courses = Course::paginate(50);

        foreach($courses as $course)
            $course->categories;
                
        return Response()->json($courses, 200);
    }

}
