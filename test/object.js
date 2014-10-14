/**
 * object.js
 *
 * Created by jrootham on 13/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict";
    var assert = require("assert");
    var argumentSpec = require('../argumentSpec.js');


    describe('Object argument spec', function() {
        it('should return [] if Object spec matches Object argument', function () {
            var errorArray = argumentSpec.validate('object', {}, {a: 1, b: 2});
            assert.equal(errorArray.length, 0);
        })

        it('should return [error] if Object spec does not match argument', function () {
            var errorArray = argumentSpec.validate('object', {}, 0);
            assert.equal(errorArray.length, 1);
            assert.equal(errorArray[0], 'object is not an object');
        })
    })

})()