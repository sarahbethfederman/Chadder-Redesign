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

  // Modal module -- creates a modal window filled with content from a JSON file
  var Modal = function($trigger, triggerEvent) {
    var Modal = function() {
      this.trigger = $trigger;                                    // element that triggers modal
      this.contentRef = $trigger.data('content');                 // name of content key in JSON
      this.isActive = false;                                      // is the modal currently active

      if (triggerEvent) {                                         // event that triggers modal
        this.init(triggerEvent);
      } else {                                                    // if not included, use click event
        this.init("click");
      }
    }

    Modal.prototype.init = function(triggerEvent) {
      $trigger.on(triggerEvent, function() {                             // attach event listener
        console.log("modal created")
      });
    }

    return Modal;
  }();

  // Smooth Scroll from CSS-Tricks
  var smoothScroll = function($navBar) {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - $navBar.height()     // make up for nav-bar height, so it doesn't cover content
          }, 1000);
          return false;
        }
      }
    });
  };


  $(document).ready(function() {
    // hook up DOM elements
    var $navBar = $('.nav-bar');

    // init fixed nav effect
    navEffect($navBar);

    // init smooth scroll
    smoothScroll($navBar);

    // init modals
  });

})();
