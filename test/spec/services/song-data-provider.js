'use strict';

describe('Service: songDataProvider', function () {

  // load the service's module
  beforeEach(module('animRadioApp'));

  // instantiate service
  var songDataProvider;
  beforeEach(inject(function (_songDataProvider_) {
    songDataProvider = _songDataProvider_;
  }));

  it('should do something', function () {
    expect(!!songDataProvider).toBe(true);
  });

});
