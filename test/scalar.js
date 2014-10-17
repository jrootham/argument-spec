/**
 * scalar.js
 *
 * Created by jrootham on 12/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var expect = require("chai").expect;
    var argumentSpec = require('../argumentSpec.js');

    describe('Scalar argument spec', function(){
        describe('boolean tests', function(){
            it('should return [] if boolean spec matches boolean argument', function(){
                var errorArray = argumentSpec.validate('boolean', true, true);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if boolean spec fails to match', function(){
                var errorArray = argumentSpec.validate('boolean', true, 0);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('boolean is not a boolean');
            })
        })

        describe('number tests', function(){
            it('should return [] if number spec matches number argument', function(){
                var errorArray = argumentSpec.validate('number', 0, 3);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [] if NaN spec matches number argument', function(){
                var errorArray = argumentSpec.validate('number',NaN, 4);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [] if Infinity spec matches number argument', function(){
                var errorArray = argumentSpec.validate('number', Infinity, 6);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if number spec fails to match boolean', function(){
                var errorArray = argumentSpec.validate('number', 0, true);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('number is not a number');
            })

            it('should return [error] if number spec fails to match string', function(){
                var errorArray = argumentSpec.validate('number', 0, 'foo');
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('number is not a number');
            })
        })
    })

    describe('string tests', function(){
        it('should return [] if string spec matches string argument', function(){
            var errorArray = argumentSpec.validate('string', '', 'foo');
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if string spec fails to match', function(){
            var errorArray = argumentSpec.validate('string', '', true);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('string is not a string');
        })

        it('should return [] if regex spec matches string argument', function(){
            var errorArray = argumentSpec.validate('string', 'foo\\d', 'foo2');
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if regex spec fails to match', function(){
            var errorArray = argumentSpec.validate('string', 'foo\\d', 'fooa');
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('string does not match regex');
        })
    })

    describe('function', function () {
        it('should return [] if argument is function', function () {
            var errorArray = argumentSpec.validate('function', function(){}, function(){});
            expect(errorArray.length).to.equal(0);
        })

        it('should return [error] if argument is not function', function () {
            var errorArray = argumentSpec.validate('function', function(){}, true);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('function is not a function');
        })
    })

        describe('other scalars', function () {
        it('should return [error] if spec is null', function(){
            var errorArray = argumentSpec.validate('isnull', null, 1);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('isnull spec should not be null');
        })

        it('should return [] if spec is undefined', function(){
            var errorArray = argumentSpec.validate('isundefined', undefined, 1);
            expect(errorArray.length).to.equal(0);
        })

        it('should return [] if spec is undefined', function(){
            var errorArray = argumentSpec.validate('isundefined', undefined, function () {});
            expect(errorArray.length).to.equal(0);
        })
    })

})()