'use strict';

angular.module('midori.menu', ['ui.router', 'midori.services'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('menu', {
            url: '/menu',
            templateUrl: 'menu/menu.html',
            controller: 'MenuController',
            resolve: {
                menus: function(Items, Menu){
                    return Items.loadAllMenu();
                }
            }
        })
}])

.controller('MenuController', ['$scope', '$location', 'Cart', '$state', 'Menu',
    function($scope, $location, Cart, $state, Menu) {

    console.log(Menu);
    $scope.items = Menu.items;
    $scope.categories = Menu.categories;
    var modifiers = Menu.modifiers;

    $scope.setNewItemInCart = function(item){
        //console.log(item);
        Cart.createItem(item, modifiers);
        $state.go('cart');
    }

}]);

