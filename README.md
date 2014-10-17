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
every([spec1, spec2,...]|          every spec is true for argument (useful for composing specs)
range(low, high)|          numeric argument in low..high range (inclusive)
integer()|        integer (fractional part is 0)
instance(object)|instanceof object

You can write your own validation functions.
Here is an example:

    /*
     *      Validation function that tests if the argument is an instance of another object
     */

    var instance = function (thing) {
        var integer = new Base();

        integer.validate = function(name, argument) {
            if (! argument instanceof thing) {
                return [name + " is not an an instance "]
            }

            return [];
        }

    }

Example of Use
==============


            




