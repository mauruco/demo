## END-POINTS

* POST course (Cria um curso)
* GET course/id (Retorna um curso)
* PUT course/id (Altera um curso)
* DELETE course/id (Apaga um curso)
* GET course (Retorna cursos paginados)

>Nota: Course tem uma relação de many to many com category.<br>
>POST/PUT Se pode enviar um array com as categorias para adicionar ou alterar.<br>
>Mais informações você pode tirar do arquivo rest.http.<br>
>E a estrutura do banco na pasta database/migrate.<br>

HTTP CÓDIGOS

* 200 Requisição efetuada com sucesso
* 201 Criado
* 204 Alterado / Excluído
* 401 Não autorizado
* 404 Não encontrado
* 422 Requisição foi entendida, mas contém erros

Provavelmente os dados enviados não batem com os dados esperados.<br>
Exemplo:

Errado
```json
{
    "curso": "Curso A"
}
```
Correto "course", e não "curso"
```json
{
    "course": "Curso A"
}
```
A ideia da API é alimentar uma única aplicação e não ser uma API pública, mas para demonstração CORS foi habilitada.

>Nota: Caso sua requiseção não funcione, verifique seu código e compare acima.

Todas as funcionalidades da API podem ser encontradas no aqrquivo ./rest.http.<br>
Você pode usar esse arquivo com REST-CLIENT do VSCODE ou criar sua coleção no seu REST-CLIENTE de preferência (Postman, insomnia, etc).

## FRONT

No FRONT-END eu escolhi trabalhar com React e Redux pelos seguintes motivos:

1. Eu já desenvolvo há um tempo em React;
2. A escalabilidade de React + Redux é, ao meu ver, umas da melhores;
3. O COMPOSITE PATERN do React é muita agradável;
4. React é muito popular;
5. Já utlizei Angular e escolho sempre React antes de Angular. Gosto próprio.

**`ATENÇÃO:`** Se você quiser rodar esse projeto em outra rota ou porta que não seja a http://localhost:8080,
vocẽ terá que editar .env.production com dados corretos e compilar o projeto. Parto do princípio que você entende de npm, React, etc, e sabe rodar
o comando build. Caso precise de ajuda o link "https://github.com/facebook/create-react-app" contém tudo que você precisa.

## Como rodar esse projeto?

1. Utilizando docker para rodar o projeto.
    * Docker version 18.06.1-ce ou maior
    * docker-compose version 1.22.0, build f46880fe ou maior

2. Ou instalando todas as dependências manualmente.

>Nota: Tudo abaixo foi testado em um ambiente LINUX.<br>
>O Docker no Windows vai se comportar parecido e deve rodar na maioria das vezes sem problemas.<br>
>Mas no momento ainda não testei o Docker container no Docker Windows.

>Nota: Eu parto do princípio que na sua máquina tenha instalado todas as dependências (PHP7.2, Composer, MySQL).

>Nota: Para simplificar esse projeto teste, o arquivo .env foi excluído do arquivo .gitignore propositalmente.

### `1. DOCKER`

```sh
$ git clone https://github.com/mauruco/demo.git
$ cd demo
$ chmod +x docker-config/entrypoint.sh
$ docker-compose up
```
>Nota: Todos os testes de unidades rodam automaticamente a cada container start.<br>
>O resultado é visível no terminal.

>Nota: A primeira vez demora em torno de 5 minutos para os containers levantarem.<br>
>Depende apenas da sua conexão e pc.

**`PRONTO`. O projeto pode ser acessado em: http://localhost:8080**

**`RODAR TESTES UNITÁRIOS MANUALMENTE PELO DOCKER CONTAINER`**

```sh
$ cd demo
demo$ docker-compose up
demo$ docker exec -it demo_1 /bin/bash
root@demo_1:/var/www/html#./phpunit
```

**Comando para parar os containers**

```sh
$ cd demo
demo$ docker-compose stop
```
>Nota: Ou simplesmente ctrl+c

**Comando levantar (startar) os containers**

```sh
$ cd demo
demo$ docker-compose up
```

**Remover os containers**

```sh
$ cd demo
demo$ docker-compose down
rm docker-config/on_container_first_start.success
```
>Nota: O arquivo docker-config/on_container_first_start.success faz parte de um script meu.<br>
>Ele serve para definir que os scripts foram rodados com sucesso ao criar os containers.<br>
>Ele não deve ser commitado e deve ser excluído para que um próximo build dos containers execute todos os comandos.

### `2. MANUALMENTE`

* Rode os comandos abaixo na sequência que estão.

>Nota: Se o comandos abaixo não funcionarem, é porque seu ambiente de desenvolvimento não está configurado como o esperado.<br>
> Verifique as dependências com os comandos abaixo.

```sh
$ php --version
$ composer --version
```

>Nota: Certifique-se que mysql está instalado e respondendo na porta que você definiu (padrão 3306).

```sh
$ git clone https://github.com/mauruco/demo.git
$ cd demo
demo$ composer install
```
* Crie um banco de dados.
* Configure demo/.env corretamente com DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME e DB_PASSWORD.
* Rode o comando abaixo para criar as tabelas.

```sh
demo$ php artisan migrate
demo$ php artisan db:seed
demo$ ./phpunit
demo$ php -S 0.0.0.0:8080 -t public public/index.php
```
>Nota: ./phpunit roda todos os testes unitários.

**`PRONTO`. O projeto pode ser acessado em: http://localhost:8080**