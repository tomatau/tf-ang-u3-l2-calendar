angular.module('Calendar')
    .directive('calendarControl', function(CAL_DIR, CurrentRange){
        'use strict';
        var current = CurrentRange.getMonth(),
            defaultRange = 20,
            MNTHS = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
        function makeYears(range){
            var startYear = current.year - (range || defaultRange),
                i = 0, l = (range || defaultRange) * 2, years = [];
            for (; i <= l; i++) { years.push(startYear + i); };
            return years;
        }
        function setDate(){
            CurrentRange.set( new Date(current.year, current.month) );
        }
        return {
            restrict: 'E',
            templateUrl: CAL_DIR + 'control.tmpl.html',
            controller: function($scope){
                $scope.current = current;
                $scope.months = MNTHS;
                $scope.years = makeYears();
                $scope.$watch( 'current',
                    function( newValue, oldValue ){
                        if ( newValue == oldValue ) return;
                        current = newValue; setDate();
                    }, true )
            }
        }
    });