angular.module('Models')
    .factory('CurrentRange', function(){
        'use strict';
        var currentRange = {};

        return {
            currentDateOb: null,
            set: function(day, range){
                this.currentDateOb = day;
                angular.extend(this.reset(), range)
            },
            get: function(){
                return currentRange;
            },
            reset: function(){
                for (var member in currentRange)
                    delete currentRange[member];
                return currentRange;
            }
        };
    });