/**
 * argumentSpec.js
 *
 * Created by jrootham on 12/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"

    var isArray = function (someVar) {
        return Object.prototype.toString.call( someVar ) === '[object Array]'
    }

    var validate = function(name, spec, argument) {

        var result = [];
        switch (typeof spec) {
            case typeof true:
                if (typeof argument !== typeof true) {
                    result = result.concat(name + " is not a boolean");
                }
                break;

            case typeof 0:
                if (typeof argument !== typeof 0) {
                    result = result.concat(name + " is not a number");
                }
                break;

            case typeof '':
                if (typeof argument !== typeof '') {
                    result = result.concat(name + " is not a string");
                }
                else {
                    if (spec.length > 0) {
                        var regex = new RegExp(spec);
                        if (!regex.test(argument)) {
                            result = result.concat(name + " does not match regex");
                        }
                    }
                }
                break;

            case typeof {}:                    // Objects and arrays
                if(isArray(spec)) {
                    if (!isArray(argument)) {
                        result = result.concat(name + " is not an array");
                    }
                    else {
                        if (spec.length == 1) {
                            if (!argument.every(function (element) {
                                var temp = validate('', spec[0], element)
                                return 0 === temp.length
                            })) {
                                result = result.concat(name + ' spec does not match some element');
                            }

                        }
                        else {
                            if (spec.length > 1) {
                                if (spec.length != argument.length) {
                                    result = result.concat(name + " does not match length");
                                }
                                else {
                                    for(var i = 0 ; i < spec.length ; i++) {
                                        var temp = validate('', spec[i], argument[i])
                                        if (0 < temp.length) {
                                            result = result.concat(name + ' spec does not match element');
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (typeof argument !== typeof {}) {
                        result = result.concat(name + " is not an object");
                    }
                    else {
                    }
                }
                break;

        }
        return result;
    };

    var any= function() {
        if (!spec.some(function (item) {
            return 0 === (validate('', item, argument)).length;
        })) {
            var result = result.concat(name + " does not match any spec");
        }

    }

    exports.validate = validate;
})()