/**
 * array.js
 *
 * Created by jrootham on 13/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var expect = require("chai").expect;
    var argumentSpec = require('../argumentSpec.js');

    describe('Array argument spec', function() {
        it('should return [] if Array spec matches Array argument', function(){
            var errorArray = argumentSpec.validate('array', [], [1,2,3]);
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if Array spec does not match argument', function(){
            var errorArray = argumentSpec.validate('array', [], 0);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('array is not an array');
        })

        it('should return [] if Array spec matches complete Array argument', function(){
            var errorArray = argumentSpec.validate('array', [0, 0, 0], [1,2,3]);
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if Array spec length does not match argument length', function(){
            var errorArray = argumentSpec.validate('array', [0, 0], [1]);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('array does not match length');
        })

        it('should return [errorList] if Array spec does not match argument', function(){
            var errorArray = argumentSpec.validate('array', [0, true], ["", 3]);
            expect(errorArray.length).to.equal(2);
            expect(errorArray[0]).to.equal('array:0 is not a number');
            expect(errorArray[1]).to.equal('array:1 is not a boolean');
        })

        it('should return [] if Array spec matches each Array argument', function(){
            var errorArray = argumentSpec.validate('array', [0], [1,2,3]);
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if Array spec does not match some argument', function(){
            var errorArray = argumentSpec.validate('array', [0], [1, true]);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('array spec does not match some element');
        })

    });

})()