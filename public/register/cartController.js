/*
MidoriCashier.controller('CashierCartController', ['$scope', 'Cart', '$location', '$log', '$cookieStore', '$timeout', function($scope, Cart, $location, $log, $cookieStore, $timeout) {
    $scope.fa = {};
    $scope.fa.unchecked = "fa-square-o";
    $scope.fa.checked = "fa-check-square-o";
    //$scope.cart = Cart.getCart();
    //$scope.total = Cart.getTotal();

    $scope.$watch(function() {
        return $cookieStore.get('cart');
    }, function(newValue) {
        $scope.cart = Cart.getCart();
        $scope.total = Cart.getTotal();
    });

    $scope.remove = function(index){
        $scope.cart = Cart.removeItem(index);
        $scope.total = Cart.getTotal();
    }

    $scope.checkout = function(){
        $location.path('confirm');
    }
}])
*/

MidoriRegister.controller('CartController', ['$scope', '$location', '$log', '$cookieStore', '$timeout', 'Cart', 'Orders', '$state', 'Types',
    function($scope, $location, $log, $cookieStore, $timeout, Cart, Orders, $state, Types) {
    $scope.fa = {};
    $scope.fa.unchecked = "fa-square-o";
    $scope.fa.checked = "fa-check-square-o";

    $scope.cart = Cart.getCart();
    $scope.diningTypes = Types.dining;

    $scope.removeAll = function(){
        Cart.removeAll();
        $scope.cart = Cart.getCart();
    }

    $scope.remove = function(index){
    }

    $scope.placeOrder = function(){
        Orders.create($scope.cart).
            success(function(orderId){
                Cart.removeAll();
                $state.go("register.complete", { orderId: orderId });
            }).
            error(function(err) {
                console.log('Error: ' + err);
            });
    }
}])

