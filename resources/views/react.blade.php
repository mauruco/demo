<?php

    $file = dirname(__FILE__).'public/react_app/build/index.html';
    $file = str_replace('storage/framework/views', '', $file);

    if($file){
        
        $content = file_get_contents($file);
        echo $content;
    }
        