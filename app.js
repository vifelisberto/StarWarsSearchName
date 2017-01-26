//o modulo angular define um aplicativo
var app = angular.module('starwars', []);
//controller é o controlador da aplicaçao
app.controller('FormCtrl', function ($scope, $http) {
    // variavel criada para usar o ng-show no html,
    // com o valor 'false' todos os itens que possuem o ng-show ficam `escondidos` para o usuário
    $scope.visivel = false;

    // essa funcao, submit(), é executada somente quando o botao submit, ou Enviar (como está no seu HTML), é pressionado
    $scope.submit = function () {

      // o $http é um servico do angular que recebe um unico objeto(de configuraçao) que é utilizado para gerar um pedido http
      //e devolve uma "promessa"
    $http({
        // metodo GET, pois voce esta fazendo uma requisição de URL, uma busca nessa API
        method: 'GET',
        // link, URL, de sua requisiçao sua API
        url: 'https://swapi.co/api/people/?search=' + $scope.value // $scope.value é o valor, texto, dado, que o usuário digitar no HTML
        //.then retorna uma "promessa"
    }).then(function successCallback(response) {
        //se entrar aqui = Sucesso na requisicão
        console.log(response); // Log para ver o resultado da busca e achar onde estão os parametros que precisamos
        // $scope = true   (Ficando visivel os itens do html que usam a variavel visivel (ng-show="visivel")
        $scope.visivel = true;

        // na api de busca (search), tenho muitos dados e parametros
        // pelo console log que fiz acima, percebi que as informações que você quer apresentar estão...
        // dentro de 'data' e dentro de 'results'...
        // coloquei results[0], por que os parametros estao dentro de um vetor, por isso o '0', pois é...
        // o primeiro item e unico item do vetor
        $scope.star = response.data.results[0];
    }, function errorCallback(response) {
            //erro
      });
    }
    //funcao que faz submit com a tecla ENTER
    $scope.keydown = function (event){ //receber o parametro de evento
        if (event.keyCode ==13){ //se o keycode do parametro for = 13 (TECLA ENTER)
              $scope.submit(); //dar submit
        }
    }
});
