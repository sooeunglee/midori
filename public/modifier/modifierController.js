'use strict';

angular.module('midori.modifier', ['ui.router', 'ngCookies', 'ui.bootstrap', 'midori.filters'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('modifier', {
            url: '/cart/:itemId',
            templateUrl: 'modifier/modifier.html',
            controller: 'ModifierController'
        })
}])

.controller('ModifierController', ['$scope', '$stateParams', 'Cart', '$state', function($scope, $stateParams, Cart, $state) {

    var id = $stateParams.itemId;
    console.log(id);
    var item = angular.copy(Cart.getItem(id));
    if (item) {
        $scope.item = item;
        var initModifiers = angular.copy(item.modifiers);
    }
    else {
        $state.go("menu");
    }

    $scope.$watch("item.modifiers", function(value){
        console.log(value);
        $scope.item.price = Cart.setItemModifiers(value, id);
    }, true);

    $scope.addon = function(select){
        if (select.qty) select.qty = 0;
        select.qty++;
        return select;
    }

    $scope.addOne = function(select){
        return select.qty++;
    }

    $scope.subtractOne = function(select){
        if (select.qty > 0)
            return select.qty--;
    }
    $scope.reset = function(){
        $scope.item.modifiers = angular.copy(initModifiers);
    }
    $scope.submit = function(){
        $state.go("cart");
    }

}])



