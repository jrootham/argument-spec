/**
 * scalar.js
 *
 * Created by jrootham on 12/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var assert = require("assert");
    var argumentSpec = require('../argumentSpec.js');

    describe('Scalar argument spec', function(){
        describe('boolean tests', function(){
            it('should return [] if boolean spec matches boolean argument', function(){
                var errorArray = argumentSpec.validate('boolean', true, true);
                assert.equal(0, errorArray.length);
            })

            it('should return [error] if boolean spec fails to match', function(){
                var errorArray = argumentSpec.validate('boolean', true, 0);
                assert.equal(1, errorArray.length);
                assert.equal('boolean is not a boolean', errorArray[0]);
            })
        })

        describe('number tests', function(){
            it('should return [] if number spec matches number argument', function(){
                var errorArray = argumentSpec.validate('number', 0, 0);
                assert.equal(0, errorArray.length);
            })

            it('should return [error] if number spec fails to match', function(){
                var errorArray = argumentSpec.validate('number', 0, true);
                assert.equal(1, errorArray.length);
                assert.equal('number is not a number', errorArray[0]);
            })
        })
    })

    describe('string tests', function(){
        it('should return [] if string spec matches string argument', function(){
            var errorArray = argumentSpec.validate('string', '', 'foo');
            assert.equal(0, errorArray.length);
        })

        it('should return [error] if string spec fails to match', function(){
            var errorArray = argumentSpec.validate('string', '', true);
            assert.equal(1, errorArray.length);
            assert.equal('string is not a string', errorArray[0]);
        })

        it('should return [] if regex spec matches string argument', function(){
            var errorArray = argumentSpec.validate('string', 'foo\\d', 'foo2');
            assert.equal(0, errorArray.length);
        })

        it('should return [error] if regex spec fails to match', function(){
            var errorArray = argumentSpec.validate('string', 'foo\\d', 'fooa');
            assert.equal(1, errorArray.length);
            assert.equal('string does not match regex', errorArray[0]);
        })
    })

})()