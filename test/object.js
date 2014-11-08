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
    var argumentSpec = require('argument-spec');


    describe('Object argument spec', function() {
        it('should return [] if empty Object spec for empty object argument', function () {
            var errorArray = argumentSpec.validate('object', {}, {});
            expect(errorArray.length).to.equal(0);
        })

        it('should return [] if empty Object spec for object argument', function () {
            var errorArray = argumentSpec.validate('object', {}, {a:0, b:1});
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

        it('should return [] if spec is in argument prototype chain', function () {
            var triangle = {a:1, b:2, c:3};

            function ColoredTriangle() {
                this.color = "red";
            }

            ColoredTriangle.prototype = triangle;

            var obj = new ColoredTriangle();
            var errorArray = argumentSpec.validate('object', {a:0, b:0, c:0}, obj);
            expect(errorArray.length).to.equal(0);
        })

        it('should return [] if an argument property is not in spec', function () {
            var errorArray = argumentSpec.validate('object', {a:0, b:0}, {a:1, b:4, d:"foo"});
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if an spec property is not in argument', function () {
            var errorArray = argumentSpec.validate('object', {a:0, b:0}, {a:1});
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('object:b is not in the argument');
        })

        it('should return [error] if an Object spec does not match an argument', function () {
            var errorArray = argumentSpec.validate('object', {a:0, b:0}, {a:1, b:"foo"});
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('object:b is not a number');
        })

        it('should return [error] if an Object spec does not match a nested argument', function () {
            var errorArray = argumentSpec.validate('object', {a:0, b:{a:0}}, {a:1,b: {a:"foo"}});
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('object:b:a is not a number');
        })

    })

})()