angular.module('calendar')
    .constant('CAL_DIR', './scripts/drctv/')
    .directive('calendarDisplay', function(CAL_DIR, CurrentRange){
        'use strict';
        var currentDateOb = CurrentRange.currentDateOb,
            DAYS = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];

        // function getDay(num) { return DAYS[num]; }
        function getShortDay(date) { return date.toDateString().split(" ")[0]; }
        function makeRows(days){
            var rows = [],
                week = [],
                day;
            for( var i = 0; i < days.length; i++ ) {
                day = days[i];
                week.push({
                    dayName: day.day,
                    day: day.date.getDay(),
                    weekday: getShortDay(day.date),
                    isCurrentMonth: currentDateOb.getMonth() == day.date.getMonth()
                });
                if (  (i+1) % DAYS.length === 0 ) {
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
                var currentDate = CurrentRange.get();
                $scope.$watch(
                    function() { return currentDate; } ,
                    function(newValue, oldVal){
                        if ( newValue === oldVal ) return false;
                        currentDateOb = CurrentRange.currentDateOb
                        $scope.weeks = makeRows(newValue['days']);
                    },
                    true
                )
                $scope.weeks = makeRows(currentDate['days']);
            }
        }
    })





    .directive('calendarControl', function(CAL_DIR, CurrentRange, calendarRange){
        'use strict';
        // 20 years each way on select
        var MNTHS = [
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
            ],
            currentMonth = CurrentRange.currentDateOb.getMonth(),
            currentYear = CurrentRange.currentDateOb.getFullYear(),
            range = 20;

        function makeYears(){
            var startYear = currentYear - range,
                i = 0,
                l = range * 2,
                years = [];
            for (; i <= l; i++) {
                years.push(startYear + i);
            };
            return years;
        }
        function setDate(){
            var newDate = new Date(currentYear, currentMonth);
            CurrentRange.set( newDate, calendarRange.getMonthlyRange(newDate) );
        }
        return {
            restrict: 'E',
            templateUrl: CAL_DIR + 'control.tmpl.html',
            controller: function($scope, $element){
                $scope.updateMonth = function(month){
                    $scope.currentMonth = currentMonth = month;
                    setDate();
                }
                $scope.updateYear = function(year){
                    $scope.currentYear = currentYear = year;
                    setDate();
                }
                $scope.currentYear = currentYear;
                $scope.currentMonth = currentMonth;
                $scope.months = MNTHS;
                $scope.years = makeYears();
            }
        }
    });