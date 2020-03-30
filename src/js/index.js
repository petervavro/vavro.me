import 'bootstrap';
import 'SCSS/main.scss';
import Typed from 'typed.js';

// DEFINE GLOBAL VARS
let colorsCombinations = ['#81c6dd', '#e9b64d', '#90ca77'];
let gWidth = $(window).width();
let gHeight = $(window).height();
let paper;
let hits = 0; // Points counter
let circles = [];
let paperVisible = false;

// Returns a random integer between min and max , Using Math.round() will give you a non-uniform distribution!
// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// jQuery - Test if element is in viewport
// https://coderwall.com/p/fnvjvg/jquery-test-if-element-is-in-viewport
jQuery.fn.isOnScreen = function() {
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

var steps = [
  function() {
    $('.story-part-1').addClass('d-none');
    $('.story-part-2').removeClass('d-none');

    new Typed('.story-part-2 .story-text', {
      stringsElement: '.story-part-2 .typed-strings',
      // loop: true,
      typeSpeed: 40,
      fadeOut: true,
      fadeOutDelay: 500,
      onComplete: () => {
        import(`raphael`).then(module => {
          let Raphael = module.default;

          // Creates canvas
          paper = Raphael(
            document.getElementById('intro'),
            gWidth - 30,
            gHeight
          );

          // Move Raphael's SVG to background
          $('svg').css('position', 'absolute');

          // Make paper visible
          paperVisible = true;

          // Move it to front
          $('svg').css('z-index', 1000);
        });
      },
    });
  },
];

const renderCircle = function() {
  // Create circle object
  const circle = paper.circle(
    getRandomInt(100, gWidth - 100),
    getRandomInt(100, gHeight - 100),
    getRandomInt(50, 100)
  );

  // Choose color randomly
  var randomArrayPosition = Math.floor(
    Math.random() * colorsCombinations.length
  );

  // Add parameters to circle object
  circle.attr('fill', colorsCombinations[randomArrayPosition]);
  circle.attr('stroke-width', 0);
  circle.attr('opacity', 0.4);

  // Define animation
  circle.animate(
    {
      opacity: 0,
      cx: circle.getBBox().x + getRandomInt(-10, 100),
      cy: circle.getBBox().y + getRandomInt(-10, 100),
    },
    2600,
    null,
    function() {
      this.remove();
    }
  );

  // Set hover event
  circle.click(function() {
    this.attr('fill', '#AAA');
    this.attr('opacity', 0.9);

    this.animate(
      {
        opacity: 0,
        r: 0,
      },
      getRandomInt(200, 400),
      '<',
      function() {
        // Display point counter info
        const pointsCounter = $('<div></div>')
          .addClass('points-counter')
          .css({
            top: this.attrs.cy - 6,
            left: this.attrs.cx - 6,
            opacity: 0.5,
          })
          .text(`#${++hits}`)
          .fadeTo(800, 0, function() {
            this.remove();
          });

        // Append it to body
        $('body').append(pointsCounter);

        // Remove this circle
        this.remove();
      }
    );

    if (hits === 2) {
      // Display button to continue
      $('.scroll-down')
        .animate(
          {
            opacity: 1,
          },
          1000
        )
        .show();

      // Scroll to next section
      scrollTo('#about');
    }
  });

  // Add circle
  circles.push(circle);
};

window.addEventListener('resize', function() {
  // Get window width
  gWidth = $(window).width();

  // Get window height
  gHeight = $(window).height();

  // Adjust paper size
  paper.setSize(gWidth, gHeight);
});

// On scroll
window.addEventListener('scroll', function() {
  // Remove all circle object not on screen
  if (paper !== undefined) {
    paper.forEach(el => {
      if (document.documentElement.scrollTop + 100 > el.attrs.cy) el.remove();
    });
  }

  // Add animation to all items in technology section
  $('.technology').each(function() {
    let el = $(this);

    // Check item is visible
    if (el.isOnScreen()) {
      el.addClass('zoomInRight');
    } else {
      el.removeClass('zoomInRight');
    }
  });

  // Add animations to project section
  if ($('.projects').isOnScreen()) {
    $('.projects').addClass('fadeIn');
  } else {
    $('.projects').removeClass('fadeIn');
  }

  // Save values to find out if it was scrolled up or down
  this.oldScroll = this.scrollY;
});

$(function() {
  // Adjust "intro" section to height of browser viewport
  $('#intro').height($(window).height());

  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
  // Add smooth scrolling to all links
  $('a').on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      scrollTo(this.hash);
    } // End if
  });

  // Modal : "Projects"
  $('#projectsModal').on('show.bs.modal', function(e) {
    // Hide all
    $('#projectsModal .job').addClass('d-none');

    // Unide desired only
    $(`#projectsModal .job.${e.relatedTarget.getAttribute('data-selector')}`)
      .removeClass('d-none')
      .removeClass('d-flex');
  });

  // Start timer
  setInterval(function() {
    // Render circles
    if ($('#intro').isOnScreen() && paperVisible === true) renderCircle();

    if ($('#projects').isOnScreen()) {
      const items = $('.projects .item');

      // Remove class to spin
      items.removeClass('spin');

      // Add spin to random item
      $(items[getRandomInt(0, items.length - 1)]).addClass('spin');
    }
  }, getRandomInt(400, 900));
});

var stepIndex = 0;

if (stepIndex > 0) steps[stepIndex]();

// Finish 1st step
$('.story-part-1 .btn-start').click(steps[0]);
