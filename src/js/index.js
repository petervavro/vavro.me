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

  // Set canvas
  this.setCanvas();

  if (game.paper !== undefined) game.paper.setSize(gWidth, gHeight); // Adjust paper size

  // Adjust "intro" section to height of browser viewport
  $('#intro').height(gHeight);
});

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
    if (projectsTimer === undefined) {
      // Start timer
      projectsTimer = setInterval(() => {
        // https://stackoverflow.com/questions/5766263/run-settimeout-only-when-tab-is-active
        if (document.hidden) {
          return;
        }

        // Remove "spin" class of all
        projects.removeClass('spin');

        // Add spin to random item
        $(projects[getRandomInt(0, projects.length - 1)]).addClass('spin');
      }, 1000);
    }
  } else {
    // Reset render
    clearInterval(projectsTimer);

    // Reset variable
    projectsTimer = undefined;
  }

  /*
  if ($('#technologies').isOnScreen()) {
    // Add animation to all items in technology section
    $('.technology').each(function() {
      console.log('loop');
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

    // Unhide desired only
    $(`#projectsModal .job.${e.relatedTarget.getAttribute('data-selector')}`)
      .removeClass('d-none')
      .removeClass('d-flex');
  });
});

// Finish 1st step
$('.story-part-1 .btn-start').click(() => {
  started = true;

  // Hide text part one
  $('.story-part-1').addClass('d-none');

  // Display text part two
  $('.story-part-2').removeClass('d-none');

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

// Disable scrolling to get people to play the game
if ($(window).scrollTop() === 0) {
  $('body').addClass('overflow-hidden');
}
