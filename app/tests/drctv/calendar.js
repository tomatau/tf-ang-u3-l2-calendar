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
        today;

    beforeEach(inject(
        function($rootScope, $compile, CurrentRange, calendarRange) {
            today = new Date();
            CurrentRange.set( today )
            _$compile = $compile;
            currentScope = $rootScope.$new();
            directiveElem = angular.element('<calendar-display>');
            CrRng = CurrentRange;
            clRng = calendarRange;
        }
    ));
    
    describe('Scope', function () {
        var ctrl;

        beforeEach(function () {
            compileDirective();
            ctrl = compiledElem.data('$scope');
        });
        
        // should display correct number of weeks of 7
        it('should add correct number of weeks to scope', function () {
            var crntDateRange = CrRng.get(),
                numWeeks = crntDateRange.days.length / 7;
            ctrl.weeks.should.have.length(numWeeks);
        });
        
        // cells of previous month should have a class accordinly to visually displat it
        it('should give each day an isCurrentMonth property for styling', function () {
            var current = CrRng.getMonth();
            angular.forEach( ctrl.weeks, function(week) {
                angular.forEach(week, function(day){
                    day.isCurrentMonth.should.eql( day.month == current.month )
                });
            })
        });
    });

    // it should update according to the CurrentRange business object object
    // 
    // it should display the days available from the current range within the weeks

    function compileDirective(){
        compiledElem = _$compile( directiveElem.get(0) )(currentScope);
        currentScope.$digest();
    }
});