'use strict';

// Declare app level module which depends on views, and components
angular.module('midori', [
  'ui.router',
  'midori.menu',
  'midori.cart',
  'midori.modifier'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/menu');
}])

