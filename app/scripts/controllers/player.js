'use strict';

/**
 * @ngdoc function
 * @name animRadioApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the animRadioApp
 */
angular.module('animRadioApp')
  .controller('PlayerCtrl', ['audioPlayer', 'radio', function(player, radio) {
    this.current = {
      artist: '',
      title: '',
      imgUrl: '',
      songUrl: ''
    };
    this.upcoming = {
      artist: '',
      title: '',
      imgUrl: '',
      songUrl: ''
    };

    this.playing = false;

    this.duration = 0;
    this.time = 0;

    radio.next().then(song => {
      this.current = song;
      player.src = song.songUrl;
      player.play();
      this.playing = true;
    });

    radio.next().then(song => {
      this.upcoming = song;
    });

    this.next = function() {
      this.current = this.upcoming;
      radio.next().then(song => {
        this.upcoming = song;
      });
    };

    this.togglePlayPause = function() {
      if (this.playing) {
        player.pause();
        this.playing = !this.playing;
      } else {
        player.play();
        this.playing = !this.playing;
      }
    };
}]);
