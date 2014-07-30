angular.module('calendar')
    .constant('CAL_DIR', './scripts/drctv/')
    .directive('calendarDisplay', function(CAL_DIR, CurrentDate){
        'use strict';

        return {
            restrict: 'E',
            templateUrl: CAL_DIR + 'cal.tmpl.html',
            controller: function($scope){

            }
        }
    })
    .directive('calendarControl', function(CAL_DIR, CurrentDate){
        'use strict';

        return {
            restrict: 'E',
            templateUrl: CAL_DIR + 'control.tmpl.html',
            link: function(){

            }
        }
    });