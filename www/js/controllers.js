angular.module('starter').controller('HomeController', function ($scope, ProdutosService) {
    ProdutosService.lista().then(function (dados) {
        $scope.bolos = dados;
    });
    $scope.$on('produtos-atualizados',	function(event,	dados) {
        $scope.bolos	=	dados;
});
});


angular.module('starter').controller('DetalheController', function ($scope, ProdutosService, $stateParams) {
    ProdutosService.lista().then(function (dados) {
        $scope.bolo = dados[$stateParams.boloId];
    });
});
 

angular.module('starter').controller('PedidoController', function ($scope, $stateParams, $state, $http, $ionicPopup, $ionicLoading, ProdutosService) {

    ProdutosService.lista().then(function (dados) {
        $scope.bolo = dados[$stateParams.boloId];
    });

    $scope.dados = {};

    $scope.fecharPedido = function () {
        $ionicLoading.show();
        $http.get('http://cozinhapp.sergiolopes.org/novo-pedido', {
            params: {
                pedido: $scope.bolo.nome,
                info: $scope.dados.nome
                    + ' (' + $scope.dados.telefone + ') - '
                    + $scope.dados.endereco
            }
        }).then(function () {
            $ionicPopup.alert({
                title: 'Pedido	confirmado!',
                template: 'Daqui	a	pouco	chega	:)'
            }).then(function () {
                $state.go('home');
            });
        }).catch(function (erro) {
            //	caso	dê	erro	mostra	alerta	com	o	erro
            $ionicPopup.alert({
                title: 'Erro	no	pedido!',
                template: erro.data + '.	Liga	pra	gente:	011-1406'
            });
        }).finally(function () {
            //	em	qualquer	caso,	remove	o	spinner	de	loading
            $ionicLoading.hide();

        });
    };
});