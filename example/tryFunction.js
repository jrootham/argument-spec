/**
 * tryFunction.js
 *
 * Created by jrootham on 16/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var argumentSpec = require('../argument-spec.js');

    var triangle = {a:1, b:2, c:3};

    function ColoredTriangle() {
        this.color = "red";
    }

    ColoredTriangle.prototype = triangle;

    var obj = new ColoredTriangle();

    var errorArray = argumentSpec.validate('object', {a:0, b:0, c:0}, obj);
    console.log(errorArray);
    var errorArray = argumentSpec.validate('some',argumentSpec.some([0, true]), 5);
    console.log(errorArray);
    var errorArray = argumentSpec.validate('range',argumentSpec.range(1.5, 5.5), 6.5);
    console.log(errorArray);
    var spec = argumentSpec.every(argumentSpec.integer(), argumentSpec.range(3, 10));
    var errorArray = argumentSpec.validate('every',spec, 5);
    console.log(errorArray);
    var errorArray = argumentSpec.validate('exact', argumentSpec.exact({a:1}), {a:1, b:2})
    console.log(errorArray);

})()