'use strict';

angular.module('midori.cart', ['ui.router', 'ngCookies'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('cart', {
            url: '/cart',
            templateUrl: 'cart/cart.html',
            controller: 'CartController'
        })
    }])

.controller('CartController', ['$scope', '$location', '$log', '$cookieStore', '$timeout', 'Cart', 'Orders', '$state',
    function($scope, $location, $log, $cookieStore, $timeout, Cart, Orders, $state) {
    $scope.fa = {};
    $scope.fa.unchecked = "fa-square-o";
    $scope.fa.checked = "fa-check-square-o";

    $scope.cart = Cart.getCart();
    $scope.diningTypes = Cart.getDiningTypes();

    $scope.removeAll = function(){
        Cart.removeAll();
        $scope.cart = Cart.getCart();
    }

    $scope.remove = function(index){
    }

    $scope.placeOrder = function(){
        Orders.create($scope.cart).
            success(function(data){
                Cart.removeAll();
                $state.go("menu");
            }).
            error(function(err) {
                console.log('Error: ' + err);
            });
    }
}])
