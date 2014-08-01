describe('Calendar Display', function () {
    var _$compile,
        currentScope,
        directiveElem,
        directiveInput = "inputText",
        compiledElem;
    
    beforeEach(module('Calendar'));

    beforeEach(module('tmpls'));

    var CrRng,
        clRng,
        today,
        RANGE = 20;

    beforeEach(inject(
        function($rootScope, $compile, CurrentRange, calendarRange) {
            today = new Date();
            CurrentRange.set( today );
            _$compile = $compile;
            currentScope = $rootScope.$new();
            directiveElem = angular.element('<calendar-control>');
            CrRng = CurrentRange;
            clRng = calendarRange;
        }
    ));
    
    describe('Scope Tests', function () {
        var expectedYears,
            ctrl;

        beforeEach(function () {
            today = new Date();
            expectedYears = makeExpectedYears(today);
            compileDirective();
            ctrl = compiledElem.data('$scope');
        });

        // drop down meny lets you choose a month and year+-20
        it('should display correct month range in select', function () {
            ctrl.months.should.have.length(12);
        });

        it('should display the correct years range on scope', function () {
            ctrl.years.should.eql(expectedYears);
        });

        it('should set the date to the CurrentRange', function () {
            ctrl.current.year.should.eql(today.getFullYear());
            ctrl.current.month.should.eql(today.getMonth());
        });

        it('should have a function to update the month', function () {
            ctrl.current.month = 1; // feb
            ctrl.$digest();
            CrRng.getMonth().month.should.eql(1);

            ctrl.current.month = 11; // december
            ctrl.$digest();
            CrRng.getMonth().month.should.eql(11);
            // make sure all updates happened
            ctrl.current.month.should.eql(11);
        });

        it('should have a function to update the year', function () {
            ctrl.current.year = 2000;
            ctrl.$digest();
            CrRng.getMonth().year.should.eql(2000);

            ctrl.current.year = 2102;
            ctrl.$digest();
            CrRng.getMonth().year.should.eql(2102);
            
            ctrl.current.year = 1999;
            ctrl.$digest();
            CrRng.getMonth().year.should.eql(1999);
            // make sure all updates happened
            ctrl.current.year.should.eql(1999);
        });
    });

    describe('Render', function () {
        // we're currently using an ng-click on a li
        //  spec says 'select' but we don't need one
        //  .: maybe not worth testing so specifically how the method is invoked?
        //  aslong as we iterate the months and years each 
        //      with updateMonth using iteration $index
        //      with updateYear using iteration value
        //  but even this isn't required fully...
    });

    function compileDirective(){
        compiledElem = _$compile( directiveElem.get(0) )(currentScope);
        currentScope.$digest();
    }

    function makeExpectedYears(dateOb){
        var startYear = dateOb.getFullYear() - RANGE,
            expectedYears = [];
        for (var i = 0; i <= RANGE * 2; i++) {
            expectedYears.push(startYear + i)
        };
        return expectedYears;
    }
});