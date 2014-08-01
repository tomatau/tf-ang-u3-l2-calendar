angular.module('Calendar')
    .constant('CAL_DIR', 'scripts/drctv/')
    .directive('calendarDisplay', function(CAL_DIR, CurrentRange){
        'use strict';
        var current = CurrentRange.getMonth(),
            currentDate = CurrentRange.get(), // reference to model data
            DAYS = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
        function getShortDay(dateOb) { return dateOb.toDateString().split(" ")[0]; }
        function makeRows(daysArray) {
            var rows = [], week = [], month;
            angular.forEach(daysArray, function(day, i) {
                month = day.date.getMonth();
                week.push({
                    isCurrentMonth: ( current.month == month ),
                    month: month, // used in testing
                    weekday: getShortDay(day.date),
                    dayNum: day.day
                });
                if ( (i+1) % DAYS.length === 0 ) { rows.push(week); week = []; }
            });
            return rows;
        }
        return {
            restrict: 'E',
            templateUrl: CAL_DIR + 'cal.tmpl.html',
            controller: function($scope){
                $scope.$watch( function() { return currentDate; },
                    function updateWeeks(newValue, oldVal){
                        if ( newValue === oldVal ) return false;
                        current = CurrentRange.getMonth();
                        $scope.weeks = makeRows(newValue['days']);
                    }, true );
                $scope.weeks = makeRows(currentDate['days']);
                $scope.headers = DAYS;
            }
        }
    });