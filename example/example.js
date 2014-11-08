/**
 * example.js
 *
 * Created by jrootham on 17/10/14.
 *
 * Copyright © 2014 Jim Rootham
 */
(function () {
    "use strict";

    var EventEmitter = require('events').EventEmitter;

    var argumentSpec = require ('../argument-spec.js');

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


    write(
        {name:'abCdoeof sdjf sfdj asdf', extension:'foo'},
        {size:30, width:10, buffer:new EventEmitter()},
        'foo');
})()