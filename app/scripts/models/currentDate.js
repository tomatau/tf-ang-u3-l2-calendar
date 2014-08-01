angular.module('Models')
    .factory('CurrentRange', function( calendarRange ){
        'use strict';
        var currentRange = {},
            currentDateOb;

        return {
            getMonth: function(){
                if ( currentDateOb == null )
                    throw new Error('Cannot get month when no date')
                return {
                    year: currentDateOb.getFullYear(),
                    month: currentDateOb.getMonth(),
                }
            },
            set: function(day){
                currentDateOb = day;
                angular.extend(this.reset(), calendarRange.getMonthlyRange(day))
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