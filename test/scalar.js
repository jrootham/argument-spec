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
                var errorArray = argumentSpec.validate('number', 0, 0);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if number spec fails to match', function(){
                var errorArray = argumentSpec.validate('number', 0, true);
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

    describe('other scalars', function () {
        it('should return [error] if spec is null', function(){
            var errorArray = argumentSpec.validate('isnull', null, 1);
            expect(errorArray.length).to.equal(1);
            expect(errorArray[0]).to.equal('isnull spec should not be null');
        })
    })

})()