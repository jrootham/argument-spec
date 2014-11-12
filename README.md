argument-spec
============

A library to ease argument checking, espcially complex arguments like options objects.

Usage
=====

    var argumentSpec = require('argument-spec.js');

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
function(a1,a2, ...)|Argument is function with matching number of arguments
{}|Any Object
{key1:spec, key2:spec2,...}| Object containing key1, key2,... where each property matches the corresponding spec. Keys are included in the name part of any error message. 
argumentSpec.Base->{validate:function, spec:{key1:spec, key2:spec2,...}}| A function that validates an argument using a spec object (see below).

Array and object specs nest.

Validation Functions
=====================

Functions and related specifications are defined as properties of objects created by the function argumentSpec.Base. 

Function| definition
------------|---
some([spec1, spec2,...]|           some spec is true for argument
every([spec1, spec2,...]|          every spec is true for argument (useful for composing specs)
range(low, high)|          numeric argument in low..high range (inclusive)
integer()|        integer (fractional part is 0)
length(maxLength) | argument.length <= maxLength (argument.length must exist)
instance(object)|instanceof object
exact(object)|exact match for object properties, useful for options without defaults
optional(object)|permit missing properties in the argument, useful for options with defaults
You can write your own validation functions.
Here is an example:

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


Example of Use
==============

    var write = function(file, data, fetch) {
        var fileSpec = {
            name:argumentSpec.every([argumentSpec.length(10), "[a-z]+"]) ,
            extension: "jpg|gif"
        };

        var dataSpec = {
            width: argumentSpec.range(20, 500),
            height: argumentSpec.range(20, 500),
            buffer: argumentSpec.instance(Buffer)
        };

        var errorArray = argumentSpec.validate('file', fileSpec, file);
        errorArray = errorArray.concat(argumentSpec.validate('data', dataSpec, data));
        errorArray = errorArray.concat(argumentSpec.validate('fetch', function(){}, fetch));

        if (errorArray.length > 0) {
            throw new Error(errorArray.join('\n'));
        }
    }


            




