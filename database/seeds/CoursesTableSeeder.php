<?php

use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert([
            'course' => 'Curso React',
            'text' => 'Aprenda Aplicar o Gerenciamento de Estados e Interação com APIs. Junte-se à Nós! Certificado Udacity. Cursos Em Português. Cursos do Vale do Silício. Parceria com Google. Aprendizado por Projetos. Instrutores Renomados.',
            'img' => 'react.png',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('courses')->insert([
            'course' => 'Curso HTML5',
            'text' => 'Você vai aprender: HTML5, CSS3, JavaScript, Ajax JQuery e muito mais. Podemos te ajudar a escolher o curso ideal e tirar suas dúvidas. Qualidade Caelum. Inscreva-se. Conheça Nossos Cursos.',
            'img' => 'html5.png',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('courses')->insert([
            'course' => 'Curso Laravel',
            'text' => 'O Laravel é framework PHP baseado na arquitetura MVC e tem um excelente desempenho. Veremos no decorrer do curso instalação, configuração, rotas.',
            'img' => 'laravel.png',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        // INSERT INTO `desenv`.`courses` (course, text, img) VALUES ("Curso React", "Aprenda Aplicar o Gerenciamento de Estados e Interação com APIs. Junte-se à Nós! Certificado Udacity. Cursos Em Português. Cursos do Vale do Silício. Parceria com Google. Aprendizado por Projetos. Instrutores Renomados.", "react.png");
        // INSERT INTO `desenv`.`courses` (course, text, img) VALUES ("Curso HTML5", "Você vai aprender: HTML5, CSS3, JavaScript, Ajax JQuery e muito mais. Podemos te ajudar a escolher o curso ideal e tirar suas dúvidas. Qualidade Caelum. Inscreva-se. Conheça Nossos Cursos.", "html5.png");
        // INSERT INTO `desenv`.`courses` (course, text, img) VALUES ("Curso Laravel", "O Laravel é framework PHP baseado na arquitetura MVC e tem um excelente desempenho. Veremos no decorrer do curso instalação, configuração, rotas.", "laravel.png");
    }
}
