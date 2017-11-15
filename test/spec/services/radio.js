'use strict';

describe('Service: radio', function () {

  // load the service's module
  beforeEach(module('animRadioApp'));

  // instantiate service
  var radio;
  beforeEach(inject(function (_radio_) {
    radio = _radio_;
  }));

  it('should do something', function () {
    expect(!!radio).toBe(true);
  });

});
