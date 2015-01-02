// IIFE
(function () {
  var $window = $(window); // cache window object

  var navEffect = function($navBar) {
    var isFixed = false;

    function fixNav() {
      $navBar.toggleClass('is-fixed');
      isFixed = !isFixed;
    }

    // bind scroll event
    $window.scroll(function() {
      if ($window.scrollTop() > 80) {
        if (!isFixed) {
          fixNav();
        }
      } else {
        if (isFixed) {
          fixNav();
        }
      }
    });
  };

  var smoothScroll = function() {       // smooth scroll from CSS-Tricks
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 50 // make up for nav-bar height
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
    navEffect($('.nav-bar'));
  });

})();
