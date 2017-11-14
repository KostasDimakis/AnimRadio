'use strict';

/**
 * @ngdoc service
 * @name animRadioApp.audioPlayer
 * @description
 * # audioPlayer
 * Service in the animRadioApp.
 */
angular.module('animRadioApp')
  .service('audioPlayer', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this._player = new Audio();
  });
