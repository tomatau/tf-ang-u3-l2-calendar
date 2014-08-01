angular.module("Models",[]),angular.module("Calendar",["Models"]),angular.module("myApp",["Calendar","Models"]).run(["CurrentRange",function(e){e.set(new Date)}]),angular.module("Models").factory("CurrentRange",["calendarRange",function(e){"use strict";var t,n={};return{getMonth:function(){if(null==t)throw new Error("Cannot get month when no date");return{year:t.getFullYear(),month:t.getMonth()}},set:function(n){t=n,angular.extend(this.reset(),e.getMonthlyRange(n))},get:function(){return n},reset:function(){for(var e in n)delete n[e];return n}}}]),angular.module("Calendar").factory("calendarRange",function(){"use strict";var e=864e5;return{prepareDate:function(e){var e=new Date(e),t=e.getDay();return{date:e,weekday:0!=t&&6!=t,day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}},getMonthlyRange:function(t){var n,r,a,u,o=t.getMonth(),l=new Date(t),s=[];for(l.setDate(1),n=new Date(l),n.getDay()>0&&n.setTime(n.getTime()-n.getDay()*e),r=new Date(l),11==o?(r.setMonth(0),r.setYear(r.getFullYear()+1)):r.setMonth(o+1),r.setTime(r.getTime()-e),a=new Date(r),a.setTime(a.getTime()+(6-r.getDay())*e+e/2),u=new Date(n);a>=u;)s.push(this.prepareDate(u)),u.setTime(u.getTime()+e);return{first:n,start:l,end:r,last:a,days:s}}}}),angular.module("Calendar").constant("CAL_DIR","scripts/drctv/").directive("calendarDisplay",["CAL_DIR","CurrentRange",function(e,t){"use strict";function n(e){return e.toDateString().split(" ")[0]}function r(e){var t,r=[],u=[];return angular.forEach(e,function(e,l){t=e.date.getMonth(),u.push({isCurrentMonth:a.month==t,month:t,weekday:n(e.date),dayNum:e.day}),(l+1)%o.length===0&&(r.push(u),u=[])}),u.length&&r.push(u),r}var a=t.getMonth(),u=t.get(),o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return{restrict:"E",templateUrl:e+"cal.tmpl.html",controller:["$scope",function(e){e.$watch(function(){return u},function(n,u){return n===u?!1:(a=t.getMonth(),void(e.weeks=r(n.days)))},!0),e.weeks=r(u.days),e.headers=o}]}}]),angular.module("Calendar").directive("calendarControl",["CAL_DIR","CurrentRange",function(e,t){"use strict";function n(e){for(var t=a.year-(e||u),n=0,r=2*(e||u),o=[];r>=n;n++)o.push(t+n);return o}function r(){t.set(new Date(a.year,a.month))}var a=t.getMonth(),u=20,o=["January","February","March","April","May","June","July","August","September","October","November","December"];return{restrict:"E",templateUrl:e+"control.tmpl.html",controller:["$scope",function(e){e.current=a,e.months=o,e.years=n(),e.$watch("current",function(e,t){e!=t&&(a=e,r())},!0)}]}}]);