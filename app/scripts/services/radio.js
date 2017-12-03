'use strict';

/**
 * @ngdoc service
 * @name animRadioApp.radio
 * @description
 * # radio
 * Service in the animRadioApp.
 */
angular.module('animRadioApp')
  .service('radio', ['$firebaseArray', function ($firebaseArray) {
  // AngularJS will instantiate a singleton by calling "new" on this function

  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyC-1LbmITfNBMTq_xHOZOpU_5AIY_LFy90",
    authDomain: "animradio-kostasdimakis.firebaseapp.com",
    databaseURL: "https://animradio-kostasdimakis.firebaseio.com",
    projectId: "animradio-kostasdimakis",
    storageBucket: "animradio-kostasdimakis.appspot.com",
    messagingSenderId: "913800109016"
  };
  firebase.initializeApp(config);

  const ref = firebase.database().ref().child('songs');
  const storage = firebase.storage();

  this._songs = $firebaseArray(ref);

  /**
   * Played songs
   * @type {Array}
   * @private
   */
  this._history = [];

  /**
   * Return a promise that resolves to a song object
   * @return {Promise.<Object>}
   */
  this.next = function() {
    return this._songs.$loaded().then(songs => {
      let songIndex = getRandomIntInclusive(0, songs.length - 1);
      this._history.push(songIndex);

      return convertStorageRefToUrl(songs[songIndex]);
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

  /**
   * Convert gs URIs to HTTP URLs
   * @param {Object} song
   * @return {Promise.<Object>}
   */
  function convertStorageRefToUrl(song) {
    // resolve the urls
    const promises = [
      storage.refFromURL(song.imgLocation).getDownloadURL(),
      storage.refFromURL(song.songLocation).getDownloadURL()
    ];
    // and return a song with the resolved urls
    return Promise.all(promises).then(data => {
      return {
        artist: song.artist,
        title: song.title,
        imgUrl: data[0],
        songUrl: data[1]
      };
    });
  }

}]);
