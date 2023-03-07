<script setup>
// Inspired by https://codepen.io/rlemon/pen/DQNbNE

// enables v-focus in templates
const vBinaryRain = {
  mounted: (el) => {
    /************* SHIM ************************/
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })()
    /********************************************/
    var canvas = el,
      ctx = canvas.getContext('2d'),
      height = (canvas.height = document.body.offsetHeight),
      width = (canvas.width = document.body.offsetWidth),
      collection = [],
      num_drops = 100, // number of drops
      gravity = 1, // gravity multiplier
      windforce = 0, // yea i'd just leave this
      windmultiplier = 0.007, // this freaks out on large numbers
      maxspeed = 5, // this is so you never run too fast (it is a multiplier not raw)
      gutter = 0.001 // the percentage distance to travel off screen before wrapping

    class Drop {
      constructor() {
        this.x
        this.y
        this.radius
        this.distance
        this.color
        this.speed
        this.vx
        this.vy
        this.text = ['1', '0'][Math.round(Math.random())]
      }
      random_x() {
        var n = width * (1 + gutter)
        return 1 - (1 + gutter) + Math.random() * n
      }
      draw(ctx) {
        ctx.fillStyle = this.color
        ctx.font = '13px "Verdana"'
        ctx.fillText(this.text, this.x - 3, this.y + 4)
      }
    }

    function draw_frame() {
      // this was recommended (see comments)
      // check it out, just comment out the
      // ctx.clearRect(0, 0, width, height);
      // line and uncomment the three below:

      //ctx.globalCompositeOperation="darker";
      //ctx.fillStyle="rgba(0,0,0,0.5)";
      //ctx.fillRect(0,0,width,height);
      ctx.clearRect(0, 0, width, height)

      // in a previous attempt I even go as far
      // as to ensure i'm drawing the furthest particles
      // first for the z-index overlay.
      // in this run I felt it was unneeded
      collection.forEach(function (drop) {
        // costly but ultimately I think it's worth it for now
        // I muck with the opacity to help with the illusion of depth
        ctx.globalAlpha = (drop.distance + 1) / 30
        drop.draw(ctx)
        ctx.globalAlpha = 1
        drop.x += drop.vx
        drop.y += drop.vy
        var lx = drop.vx + windforce
        lx < maxspeed && lx > 1 - maxspeed && (drop.vx = lx)
        if (drop.y > ((drop.distance + 1) / 10) * height) {
          drop.y = Math.random() * -drop.radius * (num_drops / 10)
          drop.x = drop.random_x()
        }
        if (drop.x > width * (1 + gutter)) {
          drop.x = 1 - width * gutter
        }
        if (drop.x < 1 - width * gutter) {
          drop.x = width * (1 + gutter)
        }
      })
    }

    function animate() {
      requestAnimFrame(animate)
      draw_frame()
    }

    function windtimer() {
      // this is a super cheap way to do this,
      // i will need to look into how to properly
      // emulate wind
      windforce = Math.random() > 0.5 ? windmultiplier : -windmultiplier
      setTimeout(windtimer, Math.random() * (1000 * 30))
    }

    function init() {
      collection = []
      while (num_drops--) {
        var drop = new Drop()
        drop.color = '#6fbdd8'
        drop.distance = (Math.random() * 10) | 0
        drop.speed = Math.random() * (drop.distance / 10) + gravity
        drop.vx = 0
        drop.vy = Math.random() * drop.speed + drop.speed / 2
        drop.radius = ((drop.distance + 1) / 16) * 3 + 10
        drop.x = drop.random_x()
        drop.y = Math.random() * height
        collection.push(drop)
      }
      windtimer()
      animate()
      window.onresize = function () {
        height = canvas.height = document.body.offsetHeight
        width = canvas.width = document.body.offsetWidth
      }
    }
    init()
  }
}
</script>

<template>
  <canvas v-binary-rain class="absolute w-full" />
</template>
