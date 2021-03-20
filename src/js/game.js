const Raphael = require('raphael');

import { getRandomInt, colorsCombinations } from './helpers.js';

class Game {
  constructor({ container, width, height, handleOnCircleClick }) {
    if (!Game.instance) {
      this.container = container;
      this.width = width;
      this.height = height;
      this.handleOnCircleClick = handleOnCircleClick;

      Game.instance = this;
    }

    return Game.instance;
  }

  /**
   * Handle click on circle
   * @param {function} cb   callback
   */
  circleClickEvent(callbackGetValue) {
    return function() {
      // Call callback
      const value = callbackGetValue();

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
            .text(`#${value}`)
            .fadeTo(800, 0, function() {
              this.remove();
            });

          // Append it to body
          $('body').append(pointsCounter);

          // Remove this circle
          this.remove();
        }
      );
    };
  }

  /**
   * Render one circle
   */
  renderCircle() {
    // Create circle object
    const circle = this.paper.circle(
      getRandomInt(100, this.width - 100),
      getRandomInt(100, this.height - 100),
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
    circle.click(this.circleClickEvent(this.handleOnCircleClick));

    return circle;
  }

  /**
   * Start circle game
   * @param {function} cb
   */
  start(cb) {
    if (!this.timer) {
      // Set canvas
      if (!this.paper) {
        // Creates canvas
        this.paper = Raphael(this.container, this.width, this.height);
      }

      // Set in back but clickable
      $(this.paper.canvas)
        .css('position', 'absolute')
        .css('z-index', 1000);

      // Generate circles
      // + Start Timer
      this.timer = setInterval(() => {
        // Create new circle
        this.renderCircle();
      }, 1000);

      // Execute callback
      if (cb !== undefined) cb();
    }
  }

  /**
   * Method to destroy the game object
   */
  destroy() {
    if (this.timer) {
      // Clear interval
      clearInterval(this.timer);

      // Destroy interval prop
      this.timer = undefined;
    }

    if (this.paper) {
      // Remove canvas
      this.paper.remove();
    }
  }
}

export default Game;
