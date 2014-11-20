/**
 * functions.js
 *
 * Created by jrootham on 13/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var expect = require("chai").expect;
    var argumentSpec = require('../argument-spec.js');

    describe('Function argument spec', function() {
        describe('some', function () {
            it('should return [] if first spec matches argument', function () {
                var errorArray = argumentSpec.validate('some', argumentSpec.some([0, true]), 5);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [] if second spec matches argument', function () {
                var errorArray = argumentSpec.validate('some', argumentSpec.some([0, true]), false);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if no spec matches argument', function () {
                var errorArray = argumentSpec.validate('some', argumentSpec.some([0, true]), "foo");
                expect(errorArray.length).to.equal(3);
                expect(errorArray[0]).to.equal('some does not match any spec');
                expect(errorArray[1]).to.equal('some:some:0 is not a number');
                expect(errorArray[2]).to.equal('some:some:1 is not a boolean');
            })
        });

        describe('range', function () {
            it('should return [] if argument is inside the range', function () {
                var errorArray = argumentSpec.validate('range', argumentSpec.range(1.5, 5.5), 2.5);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [] if argument is at the beginning of the range', function () {
                var errorArray = argumentSpec.validate('range', argumentSpec.range(1.5, 5.5), 1.5);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [] if argument is at the end of the range', function () {
                var errorArray = argumentSpec.validate('range', argumentSpec.range(1.5, 5.5), 5.5);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if argument is past the end of the range', function () {
                var errorArray = argumentSpec.validate('range', argumentSpec.range(1.5, 5.5), 6.5);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('range is higher than 5.5');
            })

            it('should return [error] if argument is before the beginning of the range', function () {
                var errorArray = argumentSpec.validate('range', argumentSpec.range(1.5, 5.5), 0.5);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('range is lower than 1.5');
            })

        });

        describe('integer', function () {
            it('should return [] if argument is an integer', function () {
                var errorArray = argumentSpec.validate('integer', argumentSpec.integer(), 5);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if argument is not an integer', function () {
                var errorArray = argumentSpec.validate('integer', argumentSpec.integer(), 6.5);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('integer is not an integer');
            })
        });

        describe('every', function () {
            it('should return [] if argument is an integer in range', function () {
                var spec = argumentSpec.every([argumentSpec.integer(), argumentSpec.range(3, 10)]);
                var errorArray = argumentSpec.validate('every', spec, 5);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if argument is not an integer', function () {
                var spec = argumentSpec.every([argumentSpec.integer(), argumentSpec.range(3, 10)]);
                var errorArray = argumentSpec.validate('every', spec, 6.5);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('every:0 is not an integer');
            })

            it('should return [error] if argument is out of range', function () {
                var spec = argumentSpec.every([argumentSpec.integer(), argumentSpec.range(3, 10)]);
                var errorArray = argumentSpec.validate('every', spec, 12);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('every:1 is higher than 10');
            })

            it('should return [error] if argument is not an integer and out of range', function () {
                var spec = argumentSpec.every([argumentSpec.integer(), argumentSpec.range(3, 10)]);
                var errorArray = argumentSpec.validate('every', spec, 16.5);
                expect(errorArray.length).to.equal(2);
                expect(errorArray[0]).to.equal('every:0 is not an integer');
                expect(errorArray[1]).to.equal('every:1 is higher than 10');
            })
        });

        describe('instance', function () {
            it('should return [] if argument is an instance', function () {
                var Foo = function () {
                };
                var foo = new Foo();
                var errorArray = argumentSpec.validate('instance', argumentSpec.instance(Foo), foo);
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if argument is not an instance', function () {
                var Foo = function () {
                };
                var Bar = function () {
                };
                var bar = new Bar();
                var errorArray = argumentSpec.validate('instance', argumentSpec.instance(Foo), bar);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('instance is not an instance');
            })
        });

        describe('length', function () {
            it('should return [] if argument is shorter than maxLength', function () {
                var errorArray = argumentSpec.validate('length', argumentSpec.length(10), 'foo');
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] if argument has no length', function () {
                var errorArray = argumentSpec.validate('length', argumentSpec.length(10), 0);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('length has no length');
            })

            it('should return [error] if argument is longer than maxLength', function () {
                var errorArray = argumentSpec.validate('length', argumentSpec.length(10), "foobararoobarhoo");
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('length is longer than 10');
            })
        });

        describe('exact', function () {
            it('should return [] if empty Object spec for empty object argument', function () {
                var errorArray = argumentSpec.validate('exact', argumentSpec.exact({}), {});
                expect(errorArray.length).to.equal(0);
            })

            it('should return [] on exact match', function () {
                var errorArray = argumentSpec.validate('exact', argumentSpec.exact({a:1, b:true}), {a:1, b:true});
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] on argument not object', function () {
                var errorArray = argumentSpec.validate('exact', argumentSpec.exact({a:1}), 1);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('exact argument is not an object');
            })

            it('should return [error] on spec not object', function () {
                var errorArray = argumentSpec.validate('exact', argumentSpec.exact(1), {a:1});
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('exact spec is not an object');
            })

            it('should return [error] on extra argument', function () {
                var errorArray = argumentSpec.validate('exact', argumentSpec.exact({a:1}), {a:1, b:true});
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('exact:b is not in the spec');
            })

            it('should return [error] on extra spec', function () {
                var errorArray = argumentSpec.validate('exact', argumentSpec.exact({a:1, b:true}), {b:true});
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('exact:a is not in the argument');
            })
        });

        describe('optional', function () {
            it('should return [] if empty Object spec for empty object argument', function () {
                var errorArray = argumentSpec.validate('optional', argumentSpec.optional({}), {});
                expect(errorArray.length).to.equal(0);
            })

            it('should return [] on exact match', function () {
                var errorArray = argumentSpec.validate('optional', argumentSpec.optional({a:1, b:true}), {a:1, b:true});
                expect(errorArray.length).to.equal(0);
            })

            it('should return [error] on argument not object', function () {
                var errorArray = argumentSpec.validate('optional', argumentSpec.optional({a:1}), 1);
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('optional argument is not an object');
            })

            it('should return [error] on spec not object', function () {
                var errorArray = argumentSpec.validate('optional', argumentSpec.optional(1), {a:1});
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('optional spec is not an object');
            })

            it('should return [error] on extra argument', function () {
                var errorArray = argumentSpec.validate('optional', argumentSpec.optional({a:1}), {a:1, b:true});
                expect(errorArray.length).to.equal(1);
                expect(errorArray[0]).to.equal('optional:b is not in the spec');
            })

            it('should return [] on extra spec', function () {
                var errorArray = argumentSpec.validate('optional', argumentSpec.optional({a:1, b:true}), {b:true});
                expect(errorArray.length).to.equal(0);
            })
        });
    });
})();