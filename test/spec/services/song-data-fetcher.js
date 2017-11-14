'use strict';

describe('Service: songDataFetcher', function () {

  // load the service's module
  beforeEach(module('animRadioApp'));

  // instantiate service
  var songDataFetcher;
  beforeEach(inject(function (_songDataFetcher_) {
    songDataFetcher = _songDataFetcher_;
  }));

  it('should do something', function () {
    expect(!!songDataFetcher).toBe(true);
  });

});
