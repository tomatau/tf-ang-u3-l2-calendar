angular.module('Calendar')
	.factory('calendarRange', function(){
		'use strict';
		var DAY = 24 * 60 * 60 * 1000;
		return {

			prepareDate : function(date) {
				var date = new Date(date),
					day = date.getDay();
				return {
					date : date,
					weekday : day != 0 && day != 6,
					day : date.getDate(),
					month : date.getMonth(),
					year : date.getFullYear()
				}
			},

			getMonthlyRange : function(date) {
				var month = date.getMonth()
					,startDay = new Date(date)
					,firstDay
					,endDay
					,lastDay
					,firstDate
					,days = []
					;

				startDay.setDate(1);
				firstDay = new Date(startDay);

				if ( firstDay.getDay() > 0 ) { //Not Sunday
					firstDay.setTime(
						firstDay.getTime() - (firstDay.getDay() * DAY)
					);
				}

				endDay = new Date(startDay);
				if ( month == 11 ) {
					endDay.setMonth(0);
					endDay.setYear(endDay.getFullYear() + 1);
				} else {
					endDay.setMonth(month + 1);
				}

				endDay.setTime(endDay.getTime() - DAY);
				lastDay = new Date(endDay);
				// this may not work using current time if you use it late at night
				lastDay.setTime(
					(lastDay.getTime() + ( 6 - endDay.getDay() ) * DAY)+(DAY/2)
				);

				firstDate = new Date(firstDay);
				while ( firstDate <= lastDay ) {
					days.push(this.prepareDate(firstDate));
					firstDate.setTime(
						firstDate.getTime() + DAY
					);
				}

				return {
					first : firstDay,
					start : startDay,
					end : endDay,
					last : lastDay,
					days : days
				}
			}
		};
	});