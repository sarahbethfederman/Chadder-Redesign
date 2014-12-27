// IIFE
(function () {
  var $window = $(window); // cache window object

  var navEffect = {         // sliding nav bar effect module
    '$navBar': undefined,
    '$logo': undefined,
    'isFixed': false,
    'fixNav': function() {
      if (!this.isFixed) {
        this.$navBar.css({
        }).animate({
          'top': 0,
          'left': 0,
          'height': '50px',
          'backgroundColor': 'white'
        });

        this.isFixed = true;
      }
    },
    'unFixNav': function() {
      if (this.isFixed) {
        this.$navBar.css({
          'float': 'left'
        }).animate({
          'backgroundColor': 'transparent',
          'height': '100px'
        });

        this.isFixed = false;
      }
    },
    'init': function() {
      var self = this;

      // hook up logo
      this.$logo = this.$navBar.find('#logo');

      // bind scroll event
      $window.scroll(function() {
        if ($window.scrollTop() > 100) {
          self.fixNav();
        } else {
          self.unFixNav();
        }
      });
    }
  };

  var smoothScroll = function() {       // smooth scroll from CSS-Tricks
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  };


  $(document).ready(function() {
    // init smooth scroll
    smoothScroll();

    // hook up DOM elements
    navEffect.$navBar = $('.nav-bar');

    // init modules
    navEffect.init();
  });

})();
