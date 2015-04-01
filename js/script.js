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
  var Modal = function($triggers, $modalWindow) {

    var Modal = function($triggers, $modalWindow) {
      this.$triggers = $triggers;                                                 // elements that trigger modal
      this.isActive = false;                                                      // is the modal currently active
      this.$modalWindow = $modalWindow;                                           // DOM element

      this.init();
    };

    Modal.prototype.init = function() {
      var self = this;

      self.$modalWindow.on('click', function() {
        $(this).fadeToggle();
      });

      self.$triggers.bind('click', function(event) {                                  // attach event listener
        self.populate(self.loadContent($(this).data('content')));                                            // load the content
        self.toggle();                                                                // toggle the view

        console.log('clicked');
      });
    };

    Modal.prototype.loadContent = function(contentKey) {
      // ajax for the json data

      var content = {
        'title': "Our Encryption Technology",
        'content': "<p>The application uses ECDH with SecP256k1 to derive 256 bits keys used in AES encryption in all messages and pictures within a conversation. All content is also signed using ECDSA, but further on with a report system available a user would send the signature to the server which can verify who was the sender of the message. Pictures are encrypted with a key and that key is sent along the message, so the picture can only be de-crypted if the user has access to the message that attached it.</p><p>User data is stored on the device using SQLCipher, a main database contains necessary contents for every user logged in on that device (Token/Cookie for auto login, public key for validation, username, and db key) and is encrypted with a static key. User specific data is stored in a separate file which is encrypted with a randomly generated key and stored in the main database. You can have a password to derive the key of your database using PBKDF2 with multiple rounds of hash. This way the data isn't accessible even if a hacker can capture the files. Server client communication is performed using ASP.NET Web API and SignalR over SSL, ready for a client custom implementation.</p><p>The server only stores users, devices, and relationships(who is friends with whom, banning, conversation members of groups, etc.) data. Messages are destroyed after the device confirmed it was received. Pictures are stored in a separate table and have no relation to who has access or if it was received. For the moment, they are not deleted, in the future every message and picture will be given an expiration date and will be destroyed even if it wasn’t received.</p>"
      };

      return content;
    };

    Modal.prototype.populate = function(content) {
      // load the content into the markup
      // set the title
      this.$modalWindow.children('.modal__title').text(content.title);

      // set the content
      this.$modalWindow.children('.modal__content').html(content.content);
    };

    Modal.prototype.toggle = function() {
      // and put it in the DOM
      this.$modalWindow.fadeToggle();

      this.isActive = !this.isActive;
    };


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

    console.log("ready");

    // hook up DOM elements
    var $navBar = $('.nav-bar'),
        $form = $('.contact-form'),
        $formMessages = $('#form-messages'),
        $modalTriggers = $('.js-modal');
        $modal = $('.modal');

    // init fixed nav effect
    navEffect($navBar);

    // init smooth scroll
    smoothScroll($navBar);

    // init modals
    console.log($modalTriggers);
    new Modal($modalTriggers, $modal);

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
