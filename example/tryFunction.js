/**
 * tryFunction.js
 *
 * Created by jrootham on 16/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict"
    var argumentSpec = require('../argumentSpec.js');

    var errorArray = argumentSpec.validate('some',argumentSpec.some([0, true]), 5);
    console.log(errorArray);
    var errorArray = argumentSpec.validate('range',argumentSpec.range(1.5, 5.5), 6.5);
    console.log(errorArray);
    var spec = argumentSpec.every(argumentSpec.integer(), argumentSpec.range(3, 10));
    var errorArray = argumentSpec.validate('every',spec, 5);
    console.log(errorArray);

})()