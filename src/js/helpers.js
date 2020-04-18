// DEFINE GLOBAL VARS
let colorsCombinations = ['#81c6dd', '#e9b64d', '#90ca77'];

// Returns a random integer between min and max , Using Math.round() will give you a non-uniform distribution!
// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// jQuery - Test if element is in viewport
// https://coderwall.com/p/fnvjvg/jquery-test-if-element-is-in-viewport
const isOnScreen = function() {
  var win = $(window);

  var viewport = {
    top: win.scrollTop(),
    left: win.scrollLeft(),
  };

  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  try {
    var bounds = this.offset();

    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return !(
      viewport.right < bounds.left ||
      viewport.left > bounds.right ||
      viewport.bottom < bounds.top ||
      viewport.top > bounds.bottom
    );
  } catch (err) {
    return false;
  }
};

// Scroll to animated
const scrollTo = hash => {
  // Using jQuery's animate() method to add smooth page scroll
  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
  $('html, body').animate(
    {
      scrollTop: $(hash).offset().top,
    },
    800,
    function() {
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;

      // https://css-tricks.com/snippets/jquery/smooth-scrolling/
      // Callback after animation
      // Must change focus!
      var $target = $(hash);
      $target.focus();
      if ($target.is(':focus')) {
        // Checking if the target was focused
        return false;
      } else {
        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        $target.focus(); // Set focus again
      }
    }
  );
};

export { getRandomInt, colorsCombinations, isOnScreen, scrollTo };
