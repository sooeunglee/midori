MidoriRegister.controller('ModifierController', ['$scope', '$stateParams', 'Cart', '$state', function($scope, $stateParams, Cart, $state) {

    console.log($stateParams);
    var id = $stateParams.itemId;
    var item = angular.copy(Cart.getItem(id));
    if (item) {
        $scope.item = item;
        var initModifiers = angular.copy(item.modifiers);
    }
    //else {
    //    $state.go("menu");
    //}

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
    $scope.backToCart = function(){
        $state.go("register.cart");
    }

}])
