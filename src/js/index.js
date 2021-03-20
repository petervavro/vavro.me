import 'bootstrap';
import 'SCSS/main.scss';
import Typed from 'typed.js';
import Game from './game.js';
import { getRandomInt, isOnScreen, scrollTo } from './helpers.js';

var WebFont = require('webfontloader');

let gWidth = $(window).width();
let gHeight = $(window).height();

let hits = 0;
let projectsTimer;

// Typed animation object
const textAnimation = new Typed('.story-part-2 .story-text', {
  stringsElement: '.story-part-2 .typed-strings',
  typeSpeed: 40,
  fadeOut: true,
  fadeOutDelay: 500,
  smartBackspace: true,
  startDelay: 1000,
  onComplete: () => {
    // Start game
    game.start();
  },
});

// Circle game object
const game = new Game({
  container: document.getElementById('intro'),
  width: gWidth - 30,
  height: gHeight,
  handleOnCircleClick: () => {
    // Set handler when user click on the circle
    // Increment
    hits += 1;

    //  If there are more than 2 scroll down
    if (hits > 2) {
      // Scroll to next section
      scrollTo('#about');

      stopIntro();
    }

    return hits;
  },
});

const stopIntro = () => {
  // Stop game
  game.destroy();

  // Destroy type animation
  textAnimation.destroy();

  // Hide text part two
  $('.story-part-2').addClass('d-none');

  // Display text part one
  $('.story-part-1').removeClass('d-none');
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

  if (game.paper) game.paper.setSize(gWidth, gHeight); // Adjust paper size

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
    stopIntro();
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

    // Hide text part one
    $('.story-part-1').addClass('d-none');

    // Display text part two
    $('.story-part-2').removeClass('d-none');

    // Start animation
    textAnimation.reset();
  });

  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
  // Add smooth scrolling to all links
  $('a').on('click', function() {
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
  // Add smooth scrolling links
  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
  $('#mainMenuModal .menu-links .nav-link').on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      scrollTo(this.hash);
    }
  });
});
