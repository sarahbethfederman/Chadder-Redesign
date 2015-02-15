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
      this.trigger = $trigger;                                            // element that triggers modal
      this.contentRef = $trigger.data('content');                         // data-content is name of content key in JSON
      this.isActive = false;                                              // is the modal currently active

      if (triggerEvent) {                                                 // event that triggers modal
        this.init(triggerEvent);
      } else {                                                            // if not included, use click event
        this.init("click");
      }
    }

    Modal.prototype.init = function(triggerEvent) {
      var self = this;
      $trigger.on(triggerEvent, function() {                              // attach event listener
        console.log("modal created");
        self.open();
      });
    }

    Modal.prototype.open = function() {
      // ajax for the json data
      // if it exists, create modal div
      // and put it in the DOM
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

  var contactForm = function($formEl, $formMessages) {
    var $form = $formEl;
    var $messages = $formMessages;

    $form.submit(function(event) {
      event.preventDefault();                  // Stop the browser from submitting

      var formData = $form.serialize();

      $.ajax({                                  // Submit the form using AJAX.
        type: 'POST',
        url: $form.attr('action'),
        data: formData,
        success: function(response) {              // on success handler
          $messages.removeClass('error');         // Make sure that the formMessages div has the 'success' class.
          $messages.addClass('success');

          $messages.text(response);               // Set the message text

          $('[name="name"]').val('');             // Clear the form
          $('[name="email"]').val('');
          $('[name="message"]').val('');
        },
        error: function(data) {
          $messages.removeClass('success');       // Make sure that the formMessages div has the 'error' class
          $messages.addClass('error');

          if (data.responseText !== '') {        // Set the message text
            $$messages.text(data.responseText);
          } else {
            $$messages.text('Oops! An error occured and your message could not be sent.');
          }
        }
      });

    }); // end submit
  }; // end contactForm



  $(document).ready(function() {
    // hook up DOM elements
    var $navBar = $('.nav-bar'),
        $form = $('.contact-form'),
        $formMessages = $('#form-messages'),
        $modalTriggers = $('.js-modal');
      //  console.log($modalTriggers);

    // init fixed nav effect
    navEffect($navBar);

    // init smooth scroll
    smoothScroll($navBar);

    // init modals
    // $modalTriggers.each(function(index) {
    //
    //   console.log($(this));
    //   new Modal($(this));
    // });

    // Mobile Nav
    $('.hamburger').click(function() {
      $('.mobile-links').slideToggle();
    });

    $('.mobile-links a').click(function() { 
        $('.mobile-links').slideUp();
    });


    // init contactForm
    contactForm($form, $formMessages);
  });

})();
