angular.module('Models', []);
angular.module('Calendar', ['Models']);

angular.module('myApp', [ 'Calendar', 'Models' ])
    .run(function (CurrentRange) {
        CurrentRange.set( new Date() )
    })