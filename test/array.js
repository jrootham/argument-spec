/**
 * array.js
 *
 * Created by jrootham on 13/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var assert = require("assert");
    var argumentSpec = require('../argumentSpec.js');

    describe('Array argument spec', function() {
        it('should return [] if Array spec matches Array argument', function(){
            var errorArray = argumentSpec.validate('array', [], [1,2,3]);
            assert.equal(errorArray.length, 0);
        })

        it('should return [error] if Array spec does not match argument', function(){
            var errorArray = argumentSpec.validate('array', [], 0);
            assert.equal(errorArray.length, 1);
            assert.equal(errorArray[0], 'array is not an array');
        })

        it('should return [] if Array spec matches complete Array argument', function(){
            var errorArray = argumentSpec.validate('array', [0, 0, 0], [1,2,3]);
            assert.equal(errorArray.length, 0);
        })

        it('should return [error] if Array spec length does not match argument length', function(){
            var errorArray = argumentSpec.validate('array', [0, 0], [1]);
            assert.equal(1, errorArray.length);
            assert.equal(errorArray[0], 'array does not match length');
        })

        it('should return [error] if Array spec does not match argument', function(){
            var errorArray = argumentSpec.validate('array', [0, true], [1, 3]);
            assert.equal(1, errorArray.length);
            assert.equal(errorArray[0], 'array spec does not match element');
        })

        it('should return [] if Array spec matches each Array argument', function(){
            var errorArray = argumentSpec.validate('array', [0], [1,2,3]);
            assert.equal(errorArray.length, 0);
        })

        it('should return [error] if Array spec does not match some argument', function(){
            var errorArray = argumentSpec.validate('array', [0], [1, true]);
            assert.equal(1, errorArray.length);
            assert.equal(errorArray[0], 'array spec does not match some element');
        })

    });

})()