MidoriRegister.controller('MenuController', ['$scope', '$location', 'Cart', '$state', 'Menu', '$window', '$rootScope',
    function($scope, $location, Cart, $state, Menu, $window, $rootScope) {

    console.log("This cashier's screen");
    $scope.items = Menu.items;
    $scope.categories = Menu.categories;
    var modifiers = Menu.modifiers;
    $scope.menuShow = true;
    $scope.largeScreen = false;

    $scope.setNewItemInCart = function(item){
        var w = $window.innerWidth;
        if (w < 700)
            $scope.menuShow = false;
        else $scope.largeScreen = true;
        console.log($scope.menuShow);
        var itemId = Cart.createItem(item, modifiers);
        $state.go('register.cart', {itemId: itemId});
    }

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){
            console.log(toState.name);
            if (toState.name == "register")
                $scope.menuShow = true;
    });

}])
