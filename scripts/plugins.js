+function(o){"use strict";function t(t){t&&3===t.which||(o(n).remove(),o(r).each(function(){var n=e(o(this)),r={relatedTarget:this};n.hasClass("open")&&(n.trigger(t=o.Event("hide.bs.dropdown",r)),t.isDefaultPrevented()||n.removeClass("open").trigger("hidden.bs.dropdown",r))}))}function e(t){var e=t.attr("data-target");e||(e=t.attr("href"),e=e&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var n=e&&o(e);return n&&n.length?n:t.parent()}var n=".dropdown-backdrop",r='[data-toggle="dropdown"]',d=function(t){o(t).on("click.bs.dropdown",this.toggle)};d.prototype.toggle=function(n){var r=o(this);if(!r.is(".disabled, :disabled")){var d=e(r),i=d.hasClass("open");if(t(),!i){"ontouchstart"in document.documentElement&&!d.closest(".navbar-nav").length&&o('<div class="dropdown-backdrop"/>').insertAfter(o(this)).on("click",t);var a={relatedTarget:this};if(d.trigger(n=o.Event("show.bs.dropdown",a)),n.isDefaultPrevented())return;r.trigger("focus"),d.toggleClass("open").trigger("shown.bs.dropdown",a)}return!1}},d.prototype.keydown=function(t){if(/(38|40|27)/.test(t.keyCode)){var n=o(this);if(t.preventDefault(),t.stopPropagation(),!n.is(".disabled, :disabled")){var d=e(n),i=d.hasClass("open");if(!i||i&&27==t.keyCode)return 27==t.which&&d.find(r).trigger("focus"),n.trigger("click");var a=" li:not(.divider):visible a",s=d.find('[role="menu"]'+a+', [role="listbox"]'+a);if(s.length){var p=s.index(s.filter(":focus"));38==t.keyCode&&p>0&&p--,40==t.keyCode&&p<s.length-1&&p++,~p||(p=0),s.eq(p).trigger("focus")}}}};var i=o.fn.dropdown;o.fn.dropdown=function(t){return this.each(function(){var e=o(this),n=e.data("bs.dropdown");n||e.data("bs.dropdown",n=new d(this)),"string"==typeof t&&n[t].call(e)})},o.fn.dropdown.Constructor=d,o.fn.dropdown.noConflict=function(){return o.fn.dropdown=i,this},o(document).on("click.bs.dropdown.data-api",t).on("click.bs.dropdown.data-api",".dropdown form",function(o){o.stopPropagation()}).on("click.bs.dropdown.data-api",r,d.prototype.toggle).on("keydown.bs.dropdown.data-api",r+', [role="menu"], [role="listbox"]',d.prototype.keydown)}(jQuery);