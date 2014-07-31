describe('MyApp Run', function () {

    beforeEach(module('myApp'));
    
    it('should set the currentRange from the current date', inject(
        function (CurrentRange, calendarRange) {
            var today = new Date(),
                currentRange = calendarRange.getMonthlyRange(today);

            CurrentRange.get()['first'].should.equalDate(currentRange['first']);
            CurrentRange.get()['last'].should.equalDate(currentRange['last']);
            CurrentRange.currentDateOb.should.equalDate(today);
        }
    ));
});