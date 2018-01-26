$(document).ready(function() {
    "use strict";
    $('.burger').click(function () {
        $(this).toggleClass('open');
      });
	var myNav = {
		init: function() {
			this.cacheDOM();
			this.browserWidth();
			this.bindEvents();
		},
		cacheDOM: function() {
			this.navBars = $(".navBars");
			this.burger = $("#burger");
			this.navMenu = $("#js-menu");
		},
		browserWidth: function() {
			$(window).resize(this.bindEvents.bind(this));
		},
		bindEvents: function() {
			var width = window.innerWidth;

			if (width < 600) {
				this.navBars.click(this.animate.bind(this));
				this.navMenu.hide();
				this.burger[0].checked = false;
			} else {
				this.resetNav();
			}
		},
		animate: function(e) {
			var checkbox = this.burger[0];
			!checkbox.checked ?
				this.navMenu.slideDown() :
				this.navMenu.slideUp();

		},
		resetNav: function() {
			this.navMenu.show();
		}
	};
	myNav.init();
});