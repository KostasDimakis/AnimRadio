'use strict';

/**
 * @ngdoc overview
 * @name animRadioApp
 * @description
 * # animRadioApp
 *
 * Main module of the application.
 */
angular
.module('animRadioApp', [
  'ngAnimate',
  'ngTouch',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/main.html'
  });
}]);
