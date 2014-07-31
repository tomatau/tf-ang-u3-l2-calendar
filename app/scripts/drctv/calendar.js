angular.module('Calendar')
    .constant('CAL_DIR', './scripts/drctv/')
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

        // function getDay(num) { return DAYS[num]; }
        function getShortDay(dateOb) { return dateOb.toDateString().split(" ")[0]; }
        function makeRows(daysArray){ // don't like this
            var rows = [], week = [], i = 0, day;
            for( ; i < daysArray.length; i++ ) {
                day = daysArray[i];
                week.push({
                    dayName: day.day,
                    day: day.date.getDay(),
                    weekday: getShortDay(day.date),
                    isCurrentMonth: currentDateOb.getMonth() == day.date.getMonth()
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
            }
        }
    })

    .directive('calendarControl', function(CAL_DIR, CurrentRange, calendarRange){
        'use strict';
        var currentMonth = CurrentRange.currentDateOb.getMonth(),
            currentYear = CurrentRange.currentDateOb.getFullYear(),
            defaultRange = 20, MNTHS = [
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
            var startYear = currentYear - (range || defaultRange),
                i = 0, l = (range || defaultRange) * 2, years = [];
            for (; i <= l; i++) { years.push(startYear + i); };
            return years;
        }
        function setDate(){
            var newDate = new Date(currentYear, currentMonth);
            CurrentRange.set( newDate, calendarRange.getMonthlyRange(newDate) );
        }
        return {
            restrict: 'E',
            templateUrl: CAL_DIR + 'control.tmpl.html',
            controller: function($scope){
                $scope.updateMonth = function(month){
                    $scope.currentMonth = currentMonth = month; // don't like this
                    setDate();
                }
                $scope.updateYear = function(year){
                    $scope.currentYear = currentYear = year; // don't like this
                    setDate();
                }
                $scope.currentMonth = currentMonth; // don't like this
                $scope.currentYear = currentYear; // don't like this
                $scope.months = MNTHS;
                $scope.years = makeYears();
            }
        }
    });