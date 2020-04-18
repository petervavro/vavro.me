import 'bootstrap';
import 'SCSS/main.scss';
import Typed from 'typed.js';
import Game from './game.js';
import { getRandomInt, isOnScreen, scrollTo } from './helpers.js';

var WebFont = require('webfontloader');

let gWidth = $(window).width();
let gHeight = $(window).height();

let started = false;

let hits = 0;
let projectsTimer;

const game = new Game({
  container: document.getElementById('intro'),
  width: gWidth - 30,
  height: gHeight,
});

// Set handler when user click on the circle
game.handleOnCircleClick = () => {
  // Increment
  hits += 1;

  //  If there are more than 2 scroll down
  if (hits > 2) {
    // Allow scrolling from this point
    $('body').removeClass('overflow-hidden');

    // Scroll to next section
    scrollTo('#about');
  }

  return hits;
};

// Eliminate render-blocking resources
// https://www.keycdn.com/blog/web-font-performance
WebFont.load({
  google: {
    families: ['Ubuntu'],
  },
});

// Add method to check if element is on screen
jQuery.fn.isOnScreen = isOnScreen;

// On resize
window.addEventListener('resize', function() {
  // Get window width
  gWidth = $(window).width();

  // Get window height
  gHeight = $(window).height();

  if (game.paper !== undefined) game.paper.setSize(gWidth, gHeight); // Adjust paper size

  // Adjust "intro" section to height of browser viewport
  $('#intro').height(gHeight);
});

/**
 * Run Animations
 * @param {function} loopEvent
 */
const startAnimations = loopEvent => {
  // Start timer
  return setInterval(loopEvent, 1000);
};

/**
 * Pause Animations
 * @param {number} timer
 */
const stopAnimations = t => {
  // Reset render
  clearInterval(t);

  // Reset variable
  return undefined;
};

/**
 * Method to start animation in projects element
 * @param {*} t
 */
const startProjectsAnimations = t => {
  if (t === undefined) {
    t = startAnimations(() => {
      // https://stackoverflow.com/questions/5766263/run-settimeout-only-when-tab-is-active
      if (document.hidden) {
        return;
      }

      // Remove "spin" class of all
      projects.removeClass('spin');

      // Add spin to random item
      $(projects[getRandomInt(0, projects.length - 1)]).addClass('spin');
    });
  }

  return t;
};

// Get projects
const projectsWrapper = $('.projects');
const projects = $('.projects .item');

// On scroll
window.addEventListener('scroll', function() {
  // Remove circle animation when is not on the screen
  if (!$('#intro').isOnScreen()) {
    game.stopRenderCircles();
  } else {
    if (started === true) game.startRenderCircles();
  }

  // Spin projects
  if (projectsWrapper.isOnScreen()) {
    projectsTimer = startProjectsAnimations(projectsTimer);
  } else {
    projectsTimer = stopAnimations(projectsTimer);
  }

  /*
  if ($('#technologies').isOnScreen()) {
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
  }
  */

  // Save values to find out if it was scrolled up or down
  this.oldScroll = this.scrollY;
});

$(function() {
  // Adjust "intro" section to height of browser viewport
  $('#intro').height($(window).height());

  // Add start button functionality
  $('.story-part-1 .btn-start').click(function(event) {
    event.preventDefault();

    // Toggle is started signal
    started = true;

    // Hide text part one
    $('.story-part-1').addClass('d-none');

    // Display text part two
    $('.story-part-2').removeClass('d-none');

    // Start typed text
    new Typed('.story-part-2 .story-text', {
      stringsElement: '.story-part-2 .typed-strings',
      typeSpeed: 40,
      fadeOut: true,
      fadeOutDelay: 500,
      smartBackspace: true,
      onComplete: () => {
        // Start game
        game.startGame();
      },
    });
  });

  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
  // Add smooth scrolling to all links
  $('a').on('click', function(/*event*/) {
    // Allow scrolling
    $('body').removeClass('overflow-hidden');
  });

  // Modal : "Projects"
  $('#projectsModal').on('show.bs.modal', function(e) {
    // Hide all
    $('#projectsModal .job').addClass('d-none');

    // Show desired only
    $(`#projectsModal .job.${e.relatedTarget.getAttribute('data-selector')}`)
      .removeClass('d-none')
      .removeClass('d-flex');

    // Stop project animation
    projectsTimer = stopAnimations(projectsTimer);
  });

  $('#projectsModal').on('hide.bs.modal', function() {
    // Start projects animations if in view
    if ($('.projects').isOnScreen()) {
      projectsTimer = startProjectsAnimations(projectsTimer);
    }
  });
});

$(window).on('load', function() {
  // Disable scrolling to get people to play the game

  // BUG with $(window).scrollTop() on Safari
  // https://github.com/nuxt/nuxt.js/issues/2512
  if (
    Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    ) === 0
  ) {
    $('body').addClass('overflow-hidden');
  }

  // Remove overlap
  $('#overlap').fadeTo('slow', 0, function() {
    $(this).hide();
  });
});
