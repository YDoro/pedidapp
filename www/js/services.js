angular.module('starter')
    .service('ProdutosService', function ($http, $q) {
        var url = 'http://cozinhapp.sergiolopes.org/produtos';
        //	sempre	dispara	o	serviço	pra	checar	dados	mais	recentes
        var promise = $http.get(url).then(function (response) {
            var json = JSON.stringify(response.data);
            localStorage.setItem('cache', json);
            $rootScope.$broadcast('produtos-atualizados',	response.data);
            return response.data;
        });
        //	procura	no	localStorage
        var cache = localStorage.getItem('cache');
        if (cache != null) {
            promise = $q(function (resolve, reject) {
                resolve(JSON.parse(cache));
            });
        }
        return {
            lista: function () {
                return promise;
            }
        };
    });
