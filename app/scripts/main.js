angular.module('calendar', []);
angular.module('Models', []);

angular.module('myApp', [ 'calendar', 'Models' ])
    // model
    //  SelectedRange // directive api but less reusable
    // directives
    //  calendar
    //      month/year/pick
    //      displayCalendar
    .run(function (calendarRange, CurrentDate) {
        // console.dir(calendarRange.getMonthlyRange(new Date()).days);
        CurrentDate.set(
            calendarRange.getMonthlyRange(new Date())
        )
        console.log(CurrentDate.get())
    })