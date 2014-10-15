argumentSpec
============

A library to ease argument checking, espcially complex arguments like options objects.

Usage
=====

    var argumentSpec = require('argumentSpec.js');

    var errorArray = argumentSpec.validate(name, spec, argument);

Variable| Meaning
---------|---------
errorArray|array of string error messages (empty if no errors)
name|name of argument, included in error messages
spec|specification of expected argument (see below)
argument|argument to validate

Specification|Valid argument
-----------|----------
undefined|anything
''|string
'regex'|string argument matching regex
0 (or any number)|number
true (or false)|boolean
[]|any Array
[spec]|Array all of whose elements match spec
[spec1, spec2, ...]|Exact match for the array argument
{}|Empty Object
{key1:spec, key2:spec2,...}| Object containing exactly key1, key2,... where each property matches the corresponding spec. Keys are included in the name part of any error message. 
argumentSpec.Base->{validate:function, spec:{key1:spec, key2:spec2,...}}| A function that validates an argument using a spec object (see below).

Array and object specs nest.

Validation Functions
=====================

Functions and related specifications are defined as properties of objects created by the function argumentSpec.Base. 

Function| definition
------------|---
some([spec1, spec2,...]|           some spec is true for argument
every([spec1, spec2,...]|          every spec it true for argument
range(low, high)|          numeric argument in low..high range (inclusive)
integer()|        integer (fractional part is 0)
integerRange(low, high)|   integer in low..high range (example of composed spec)

You can write your own validation functions.
Here is an example:

    /*
     *      Validation function that tests that a numeric argument is in a given range 
     *      (closed interval)
     */

    var range = function(low, high) {
        var range = new Base();

        range.spec = {low: low, high: high};

        range.validate = function (name, spec, argument) {
            var result = [];

            // validate the spec for numerics
            
            result = validate(name + ':spec', {low: 0, high: 0}, spec);  
            
            // and they are in the right order
            
            if (result.length === 0) {
                if (spec.low > spec.high) {
                    result = [name + ":spec out of order"]
                }
            }

            if (result.length === 0) {
                result = validate(name, 0, argument);

                if (result.length === 0) {
                    if (spec.low > argument) {
                        result = [name + ' is lower than ' + spec.low];
                    }
                    if (spec.high < argument) {
                        result = [name + ' is higher than ' + spec.high];
                    }
                }
            }

            return result;
        }

        return range;
    }

            




