argumentSpec
============

A library to ease argument checking, espcially complex arguments like options objects.

Usage
=====

argumentSpec = require('argumentSpec.js');

errorArray = argumentSpec.validate(name, spec, argument);

Variable| Meaning
---------|---------
errorArray|array of string error messages (empty if no errors)
name|name of argument, included in error messages
spec|specification of expected argument (see below)
argument|argument to validate

Specification|Valid argument
-----------|----------
''|string
'regex'|argument matching regex
0 (or any number)|number
true (or false)|boolean
[]|any Array
[spec]|Array all of whose elements match spec
[spec1, spec2, ...]|Argument that matches one of the specs
{}|Empty Object
{key1:spec, key2:spec2,...}| Object containing exactly key1, key2,... where each property matches the corresponding spec. Keys are included in the name part of any error message. This spec can be recursively applied.




