MidoriRegister.controller('CompleteController', ['$scope', 'order', '$state', 'Types',
    function($scope, order, $state, Types) {

    $scope.order = order.data;
    $scope.diningTypes = Types.dining;

}])
