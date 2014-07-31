angular.module('Models', []);
angular.module('Calendar', ['Models']);

angular.module('myApp', [ 'Calendar', 'Models' ])
    .run(function (calendarRange, CurrentRange) {
        var today = new Date();
        CurrentRange.set(
            today, calendarRange.getMonthlyRange(today)
        )
    })