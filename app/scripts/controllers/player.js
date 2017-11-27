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

    /**
     * Initialize player with first 2 songs and start playing
     */
    (() => {
      // Get a song and start listening
      radio.next().then(song => {
        this.current = song;
        player.src = song.songUrl;
        player.play();
      });
      // Get the upcoming song
      radio.next().then(song => {
        this.upcoming = song;
      });
    })();

    /**
     * Listen for when a song ends and play the next one
     */
    player.addEventListener('ended', () => {
      this.current = this.upcoming;
      radio.next().then(song => {
        this.upcoming = song;
      });
      // continue playing the new song
      player.src = this.current.songUrl;
      player.play();
    });

    /**
     * Next Song button press
     */
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
