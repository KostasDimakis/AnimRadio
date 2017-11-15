'use strict';

/**
 * @ngdoc service
 * @name animRadioApp.radio
 * @description
 * # radio
 * Service in the animRadioApp.
 */
angular.module('animRadioApp')
  .service('radio', function () {
  // AngularJS will instantiate a singleton by calling "new" on this function
  /**
   * Played songs
   * @type {Array}
   * @private
   */
  this._history = [];

  /**
   * Return a promise that resolves to an array of song objects
   * @type {Promise.<Array>}
   * @private
   */
  this._songs = fetch('../data.json')
    .then(response => {
      if (!response.ok) {
        let msg = response.status + ': ' + response.statusText;
        throw new Error(msg);
      }
      return response.json();
    })
    // parse the response and add window.location.origin where I have to
    // NOTE: This `then` should be removed once I move my songs and images elsewhere
    .then(data => {
      let songs = [];
      data.forEach(song => {
        songs.push({
          artist: song.artist,
          title: song.title,
          // this is needed because they are stored inside my project
          // in a real scenario it would be a link to a storage
          imgUrl: window.location.origin + song.imgUrl,
          songUrl: window.location.origin + song.songUrl
        });
      });
      return songs;
    })
    .catch(error => {
      console.error('Oops something went wrong ', error);
  });

  /**
   * Return a promise that resolves to a song object
   * @return {Promise.<Object>}
   */
  this.next = function() {
    return this._songs.then(songs => {
      // if there are no songs return
      if (songs.length === 0 ) return;

      let song = getRandomIntInclusive(0, songs.length - 1);
      this._history.push(song);

      return songs[song];
    });
  };

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

});
