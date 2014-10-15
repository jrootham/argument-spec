/**
 * object.js
 *
 * Created by jrootham on 13/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict";
    var expect = require("chai").expect;
    var argumentSpec = require('../argumentSpec.js');


    describe('Object argument spec', function() {
        it('should return [] if Object spec matches Object argument', function () {
            var errorArray = argumentSpec.validate('object', {}, {a: 1, b: 2});
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if Object spec does not match argument', function () {
            var errorArray = argumentSpec.validate('object', {}, 0);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('object is not an object');
        })

        it('should return [] if all Object specs matches Object arguments', function () {
            var errorArray = argumentSpec.validate('object', {a: 0, b: 0}, {a: 1, b: 2});
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if an Object spec is not in argument', function () {
            var errorArray = argumentSpec.validate('object', {a:0, b:0}, {a:1, d:"foo"});
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('object:d is not in the spec');
        })

        it('should return [error] if an Object spec does not match an argument', function () {
            var errorArray = argumentSpec.validate('object', {a:0, b:0}, {a:1, b:"foo"});
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('object:b is not a number');
        })

    })

})()