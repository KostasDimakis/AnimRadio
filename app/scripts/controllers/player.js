'use strict';

/**
 * @ngdoc function
 * @name animRadioApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the animRadioApp
 */
angular.module('animRadioApp').controller('PlayerCtrl', [
  'audioPlayer', 'radio', function(player, radio) {

    this.duration = 0;
    this.time = 0;

    radio.next().then(song => {
      this.current = song;
      player.src = song.songUrl;
      player.play();
    });

    radio.next().then(song => {
      this.upcoming = song;
    });

    this.next = function() {
      this.current = this.upcoming;
      radio.next().then(song => {
        this.upcoming = song;
      });
      // continue playing if it was playing
      if (!player.paused) {
        player.src = this.current.songUrl;
        player.play();
      } else {
        // don't play if it was paused
        player.src = this.current.songUrl;
      }
    };

    this.playing = function() {
      return !player.paused;
    };

    this.togglePlayPause = function() {
      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    };
  },
]);
