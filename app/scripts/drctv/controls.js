angular.module('Calendar')
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
                $scope.currentMonth = currentMonth;
                $scope.currentYear = currentYear;
                $scope.months = MNTHS;
                $scope.years = makeYears();
            }
        }
    });