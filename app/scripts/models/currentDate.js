angular.module('Models')
    .factory('CurrentDate', function(){
        'use strict';
        var currentDate = {}

        return {
            set: function(data){
                angular.extend(this.reset(), data)
            },
            get: function(){
                return currentDate;
            },
            reset: function(){
                for (var member in currentDate)
                    delete currentDate[member];
                return currentDate;
            }
        };
    });