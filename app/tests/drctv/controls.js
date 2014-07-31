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
            CurrentRange.set(
                today, calendarRange.getMonthlyRange(today)
            )
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
            ctrl.currentYear.should.eql(today.getFullYear());
            ctrl.currentMonth.should.eql(today.getMonth());
        });

        it('should have a function to update the month', function () {
            ctrl.updateMonth(1); // jan
            CrRng.currentDateOb.getMonth().should.eql(1);
            ctrl.updateMonth(11); // december
            CrRng.currentDateOb.getMonth().should.eql(11);
            ctrl.currentMonth.should.eql(11);
        });

        it('should have a function to update the year', function () {
            ctrl.updateYear(2000);
            CrRng.currentDateOb.getFullYear().should.eql(2000);
            ctrl.updateYear(2102);
            CrRng.currentDateOb.getFullYear().should.eql(2102);
            ctrl.updateYear(1999);
            CrRng.currentDateOb.getFullYear().should.eql(1999);
            ctrl.currentYear.should.eql(1999);
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