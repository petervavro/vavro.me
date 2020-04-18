import { getRandomInt, colorsCombinations } from './helpers.js';

class Game {
  constructor(props) {
    if (!Game.instance) {
      this.container = props.container;
      this.width = props.width;
      this.height = props.height;

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
   * Get Raphael object
   */
  async getRaphael() {
    if (!this.Raphael) {
      let module = await import('raphael');

      // Get default
      this.Raphael = module.default;
    }

    return this.Raphael;
  }

  /**
   * Set canvas
   */
  async setCanvas() {
    if (!this.paper) {
      const Raphael = await this.getRaphael();

      // Creates canvas
      this.paper = Raphael(this.container, this.width, this.height);
    }

    // Set in back but clickable
    $(this.paper.canvas)
      .css('position', 'absolute')
      .css('z-index', 1000);

    return this.paper;
  }

  /**
   * Method to start timer for circle rendering
   */
  startRenderCircles() {
    if (this.timer === undefined) {
      // Set canvas
      this.setCanvas();

      // Generate circles
      // + Start Timer
      this.timer = setInterval(() => {
        // https://stackoverflow.com/questions/5766263/run-settimeout-only-when-tab-is-active
        if (document.hidden) {
          return;
        }

        // Create new circle
        this.renderCircle();
      }, 1000);
    }
  }

  /**
   * Method to stop timer for circle rendering
   */
  stopRenderCircles() {
    // Clear interval
    clearInterval(this.timer);

    // Destroy interval prop
    this.timer = undefined;
  }

  /**
   * Start circle game
   * @param {function} cb
   */
  async startGame(cb) {
    // Start render circles
    this.startRenderCircles();

    // Execute callback
    if (cb !== undefined) cb();
  }
}

export default Game;
