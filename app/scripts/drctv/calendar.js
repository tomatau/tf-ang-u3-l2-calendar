angular.module('Calendar')
    .constant('CAL_DIR', 'scripts/drctv/')
    .directive('calendarDisplay', function(CAL_DIR, CurrentRange){
        'use strict';
        var currentDateOb = CurrentRange.currentDateOb,
            currentDate = CurrentRange.get(), DAYS = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
        function getShortDay(dateOb) { return dateOb.toDateString().split(" ")[0]; }
        function makeRows(daysArray){ // don't like this
            var rows = [], week = [], i = 0, day,
                month, crntMonth = currentDateOb.getMonth();
            for( ; i < daysArray.length; i++ ) {
                day = daysArray[i];
                month = day.date.getMonth();
                week.push({
                    dayNum: day.day,
                    weekdayNum: day.date.getDay(),
                    weekday: getShortDay(day.date),
                    month: month,
                    isCurrentMonth: ( crntMonth == month )
                });
                if ( (i+1) % DAYS.length === 0 ) {
                    rows.push(week);
                    week = [];
                }
            }
            return rows;
        }
        return {
            restrict: 'E',
            templateUrl: CAL_DIR + 'cal.tmpl.html',
            controller: function($scope){
                $scope.$watch( function() { return currentDate; } , // don't like this
                    function updateWeeks(newValue, oldVal){
                        if ( newValue === oldVal ) return false; // don't like this
                        currentDateOb = CurrentRange.currentDateOb;  // don't like this
                        $scope.weeks = makeRows(newValue['days']);
                    }, true )
                $scope.weeks = makeRows(currentDate['days']);
                $scope.headers = DAYS;
            }
        }
    });