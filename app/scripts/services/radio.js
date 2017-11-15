'use strict';

/**
 * @ngdoc service
 * @name animRadioApp.radio
 * @description
 * # radio
 * Service in the animRadioApp.
 */
angular.module('animRadioApp')
  .service('radio', ['$http', function ($http) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  /**
   * Currently playing song
   * @type {number}
   * @private
   */
  this._currentSong = 0;
  /**
   * Played songs
   * @type {Array}
   * @private
   */
  this._history = [];
  /**
   * Return a promise that resolves an array of song objects
   * @type {Promise.<Array>}
   * @private
   */
  this._songs = $http({
    method: 'GET',
    url: '../data.json'
  })
    // parse the response and add window.location.origin where I have to
    // NOTE: This `then` should be removed once I move my songs and images elsewhere
    .then(response => {
      var data = [];
      response.data.forEach(song => {
        data.push({
          artist: song.artist,
          title: song.title,
          // this is needed because they are stored inside my project
          // in a real scenario it would be a link to a storage
          imgUrl: window.location.origin + song.imgUrl,
          songUrl: window.location.origin + song.songUrl
        });
      });
      return data;
    }, response => {
      console.error('Oops, something went wrong: ' + response.status + response.statusText)
  });

  /**
   * Return a promise that resolves to a song object
   * @return {Promise.<Object>} Resolves to a song object
   */
  this.next = function() {
    this._songs.then(songs => {
      // if there are no songs return
      if (songs.length === 0 ) return;

      this._history.push(this._currentSong);
      this._currentSong = getRandomIntInclusive(0, songs.length - 1);

      return songs[this._currentSong];
    });

    /**
     * Return a number between and including min, max.
     * @param {number} min
     * @param {number} max
     * @return {number} min <= number <= max
     */
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
  };
}]);
