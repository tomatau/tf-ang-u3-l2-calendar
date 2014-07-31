angular.module('calendar', []);
angular.module('Models', []);

angular.module('myApp', [ 'calendar', 'Models' ])
    // model
    //  SelectedRange // directive api but less reusable
    // directives
    //  calendar
    //      month/year/pick
    //      displayCalendar
    .run(function (calendarRange, CurrentRange) {
        var today = new Date();
        // console.dir(calendarRange.getMonthlyRange(new Date()).days);
        CurrentRange.set(
            today, calendarRange.getMonthlyRange(today)
        )
        // console.log(CurrentRange.get())
        // debugger;
    })