<?php
/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our application. We just need to utilize it! We'll simply require it
| into the script here so that we don't have to worry about manual
| loading any of our classes later on. It feels great to relax.
|
*/

// Esse código a baixo só será executao rodando com o servidor localhost:8080 DO PHP!!!
$file = dirname(__FILE__).$_SERVER['REQUEST_URI'];
// var_dump($ext);
if(preg_match('/index.html\?/', $file)){
    
    header('Content-Type: text/html');
    $file = explode('?', $file);
    $file = file_get_contents($file[0]);
    echo $file;
    die();
}

if(preg_match('/public/', $file) && file_exists($file)){

    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $file = file_get_contents($file);


    switch($ext) {

        case 'json':
            header('Content-Type: application/json');
            echo $file;
            die();
        break;

        case 'png':
            header('Content-Type: image/png');
            echo $file;
            die();
        break;

        case 'css':
            header('Content-Type: text/css');
            echo $file;
            die();
        break;

        case 'map':
            header('Content-Type: text/plain');
            echo $file;
            die();
        break;

        case 'js':
            header('Content-Type: application/javascript');
            echo $file;
            die();
        break;

        case 'ico':
            header('Content-Type: image/x-icon');
            echo $file;
            die();
        break;

        case 'woff2':
            header('Content-Type: font/woff2');
            echo $file;
            die();
        break;

        case 'woff':
            header('Content-Type: font/woff');
            echo $file;
            die();
        break;
    }
}

require __DIR__.'/vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/

$app = require_once __DIR__.'/bootstrap/app.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
