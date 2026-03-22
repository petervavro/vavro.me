<script setup>
const vParticles = {
  mounted: (el) => {
    const canvas = el
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const COLORS = ['#81c6dd', '#67e8f9', '#e9b64d', '#8fcf6e']
    const COUNT = 80

    class Particle {
      constructor() {
        this.reset(true)
      }
      reset(initial = false) {
        this.x = Math.random() * width
        this.y = initial ? Math.random() * height : height + 10
        this.r = Math.random() * 1.5 + 0.4
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.speed = Math.random() * 0.4 + 0.1
        this.drift = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.4 + 0.1
      }
      update() {
        this.y -= this.speed
        this.x += this.drift
        if (this.y < -10) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const particles = Array.from({ length: COUNT }, () => new Particle())

    let raf
    function animate() {
      ctx.clearRect(0, 0, width, height)
      particles.forEach(p => { p.update(); p.draw() })
      raf = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    })
  }
}
</script>

<template>
  <Teleport to="body">
    <canvas v-particles class="fixed top-0 left-0 w-full h-full pointer-events-none" style="z-index: 0;" />
  </Teleport>
</template>
