'use strict';

var MidoriRegister = angular.module('midori.register', [
  'ui.router',
  'ui.bootstrap',
  'midori.services',
  'midori.filters'
]);

MidoriRegister.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('register', {
            url: '/',
            templateUrl: 'menu.html',
            controller: 'MenuController',
            resolve: {
                menus: function(Items, Menu){
                    console.log("menu loading");
                    return Items.loadAllMenu();
                }
            }
        })
        .state('register.cart', {
            url: 'cart',
            templateUrl: 'cart.html',
            controller: 'CartController'
        })
        .state('register.modifier', {
            url: 'cart/:itemId',
            templateUrl: 'modifier.html',
            controller: 'ModifierController'
        })
        .state('register.complete', {
            url: 'orders/:orderId',
            templateUrl: 'complete.html',
            controller: 'CompleteController',
            resolve: {
                order: function(Orders, $stateParams){
                    console.log("menu loading");
                    return Orders.get($stateParams.orderId);
                }
            }
        })
}]);
