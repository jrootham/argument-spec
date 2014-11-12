/**
 * argumentSpec.js
 *
 * Created by jrootham on 12/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
// AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
// Node. Does not work with strict CommonJS, but
// only CommonJS-like environments that support module.exports,
// like Node.
        module.exports = factory();
    } else {
// Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function () {
    "use strict"

    /*
     *      Determine if someVar is an array (node doesn't have isArray built in)
     */

    var isArray = function (someVar) {
        return Object.prototype.toString.call( someVar ) === '[object Array]'
    };

    /*
     *      Tests for when spec is an array
     */

    var validateArray = function (name, spec, argument) {
        if (!isArray(argument)) {
            return [name + " is not an array"];         // argument must be an array
        }

        if (spec.length === 0) {                        // empty spec array matches any argument array
            return [];
        }

        if (spec.length == 1) {                         // 1 element spec array matches all the argument elements
            if (!argument.every(function (element) {
                var temp = validate('', spec[0], element);
                return (0 === temp.length)
            })) {
                return [name + ' spec does not match some element'];
            }

            return [];
        }

        if (spec.length != argument.length) {           // Otherwise element wise match
            return [name + " does not match length"];
        }

        var result = [];
        for(var i = 0 ; i < spec.length ; i++) {
            result = result.concat(validate(name + ':' + i, spec[i], argument[i]));
        }
        return result;
    };

    /*
     *      Tests for when spec is an object (includes case where the spec is a function to call)
     *      This test returns an error if a property in the spec is not in the argument
     *      It includes members of the prototype chain
     */

    var validateObject = function (name, spec, argument) {
        if (spec instanceof Base) {
            var result = validate(name + ':spec', {validate: function (name, spec) {}}, spec);

            if (0 !== result.length) {
                return result;
            }

            return spec.validate(name, argument);
        }

        if (typeof argument !== typeof {}) {
            return [name + " is not an object"];
        }

        var specKeys = Object.keys(spec);

        var result = [];

        specKeys.forEach(function (key) {
            if (! (key in argument)) {
                result = result.concat(name + ":" + key + " is not in the argument")
            }
            else {
                result = result.concat(validate(name + ":" + key, spec[key], argument[key]))
            }
        })

        return result;
    };

    /*
     *      Validation function
     */

    var validate = function(name, spec, argument) {

        if (spec === undefined) {
            return [];
        }

        if (spec === null) {
            return [name + " spec should not be null"];
        }

        switch (typeof spec) {
            case typeof true:
                if (typeof argument !== typeof true) {
                    return [name + " is not a boolean"];
                }
                break;

            case typeof 0:
                if (typeof argument !== typeof 0) {
                    return [name + " is not a number"];
                }
                break;

            case typeof function () {}:
                if (typeof argument !== typeof function () {}) {
                    return [name + " is not a function"];
                }

                if (spec.length !== argument.length) {
                    return [name + " argument lists length is wrong"]
                }
                break;

            case typeof '':
                if (typeof argument !== typeof '') {
                    return [name + " is not a string"];
                }
                else {
                    if (spec.length > 0) {
                        var regex = new RegExp(spec);
                        if (!regex.test(argument)) {
                            return [name + " does not match regex"];
                        }
                    }
                }
                break;

            case typeof {}:                    // Objects and arrays
                if (isArray(spec)) {
                    return validateArray(name, spec, argument);
                }

                return validateObject(name, spec, argument);

                break;
        }

        return [];
    };

    /*
     *      Base function to determine if an object is a validation function
     */

    var Base = function () {};

    /*
     *      Validation function that tests if one of the sub specifications is true
     */

    var some = function(specArray) {
        var some = new Base();

        some.validate = function(name, argument) {
            var result = validate(name +":spec", [], specArray);
            if (0 !== result.length) {
                return result;
            }

            if (!specArray.some(function (item) {
                return 0 === (validate('', item, argument)).length;
            })) {
                return [name + " does not match any spec"];
            }

            return [];
        }

        return some;
    };

    /*
     *      Validation function that tests if all of the sub specifications are true
     */

    var every = function (specArray) {
        var every = new Base();

        every.validate = function(name, argument) {
            var result = validate(name +":spec", [], specArray);
            if (0 !== result.length) {
                return result;
            }

            var result = [];
            for (var i = 0 ; i < specArray.length ; i++) {
                result = result.concat(validate(name + ':' + i, specArray[i], argument))
            }

            return result;
        }

        return every;
    };

    /*
     *      Validation function that tests that a numeric argument is in a given range
     *      (closed interval)
     */

    var range = function(low, high) {
        var range = new Base();

        range.validate = function (name, argument) {

            if (low > high) {
                return [name + ":spec out of order"];
            }

            if (low > argument) {
                return [name + ' is lower than ' + low];
            }

            if (high < argument) {
                return [name + ' is higher than ' + high];
            }

            return [];
        };

        return range;
    }

    /*
     *      Validation function that tests if the argument is an integer
     */

    var integer = function () {
        var integer = new Base();

        integer.validate = function(name, argument) {
            if (argument !== + argument || 0 !== argument % 1) {
                return [name + " is not an integer"]
            }

            return [];
        }

        return integer;

    };

    /*
     *      Validation function that tests if the argument is an instance of another object
     */

    var instance = function (thing) {
        var instance = new Base();

        instance.validate = function(name, argument) {
            if (! (argument instanceof thing)) {
                return [name + " is not an instance"]
            }

            return [];
        }

        return instance;
    }

    /*
     *      Validation function that tests if the argument is less than a given length
     */

    var length = function (maxLength) {
        var length = new Base();

        length.validate = function(name, argument) {
            if (!argument.length) {
                return [name + " has no length"]
            }

            if (argument.length > maxLength) {
                return [name + " is longer than " + maxLength];
            }

            return [];
        }

        return length;
    }

    /*
     *      Validation function that tests if 2 objects match exactly
     *      Useful when using objects as option sets without defaults
     */

    var exact = function(spec) {
        var exact = new Base();

        exact.validate = function(name, argument) {
            var result = [];

            if (typeof spec !== typeof {}) {
                return [name + " spec is not an object"];
            }

            if (typeof argument !== typeof {}) {
                return [name + " argument is not an object"];
            }

            var specKeys = Object.keys(spec);

            specKeys.forEach(function (key) {
                if (! (key in argument)) {
                    result = result.concat(name + ":" + key + " is not in the argument")
                }
                else {
                    result = result.concat(validate(name + ":" + key, spec[key], argument[key]))
                }
            })

            var argKeys = Object.keys(argument);

            argKeys.forEach(function (key) {
                if (! (key in spec)) {
                    result = result.concat(name + ":" + key + " is not in the spec")
                }
            })

            return result;
        }

        return exact;
    }

    var optional = function(spec) {
        var optional = new Base();

        optional.validate = function(name, argument) {
            var result = [];

            if (typeof spec !== typeof {}) {
                return [name + " spec is not an object"];
            }

            if (typeof argument !== typeof {}) {
                return [name + " argument is not an object"];
            }

            var argKeys = Object.keys(argument);

            argKeys.forEach(function (key) {
                if (! (key in spec)) {
                    result = result.concat(name + ":" + key + " is not in the spec")
                }
                else {
                    result = result.concat(validate(name + ":" + key, spec[key], argument[key]))
                }
            })

            return result;
        }

        return optional;
    }

    var ship = {
        validate:       validate,
        Base:           Base,
        some:           some,
        every:          every,
        range:          range,
        integer:        integer,
        instance:       instance,
        length:         length,
        exact:          exact,
        optional:       optional
    };

// Just return a value to define the module export.
    return ship;
}));
