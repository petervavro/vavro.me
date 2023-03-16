<script>
import gsap from 'gsap'

import JSON_DATA from '~/assets/data/technologies.json'

const items = JSON_DATA.filter(({ preferred }) => preferred).sort(
  (a, b) => a.preferred - b.preferred
)

let elCoordinates = [
  [-130, -180],
  [10, 80],
  [120, -150],
  [150, 0]
]

export default {
  data() {
    return {
      items
    }
  },
  mounted() {
    if (window.innerWidth < 640) {
      elCoordinates = [
        [-100, 0],
        [-80, 40],
        [50, 0],
        [0, 42]
      ]
    }

    const tl1 = gsap.timeline()
    tl1.set(this.$refs.wrap, {
      opacity: 0,
      scale: 0,
      filter: 'blur(4px)'
    })
    tl1.to(this.$refs.wrap, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    })

    this.$refs.bullet.forEach((child, index) => {
      const tl = gsap.timeline({
        // DEV: repeat: -1,
        repeatDelay: 1,
        delay: 1 + (1 + +index)
      })

      tl.set(child, {
        opacity: 0,
        x: elCoordinates[+index][0],
        y: elCoordinates[+index][1]
      })

      tl.to(child, {
        opacity: 1,
        duration: 0.2
      })

      tl.set(this.$refs.wrap, { scale: 1 })

      // Shake wrapper
      tl.fromTo(
        this.$refs.wrap,
        {
          x: -5,
          scale: 0.99
        },
        {
          x: 5,
          scale: 1,
          clearProps: 'all',
          repeat: 5,
          duration: 0.01
        }
      )

      tl.fromTo(
        this.$refs.wrap,
        { y: -5 },
        {
          y: 5,
          clearProps: 'all',
          repeat: 5,
          duration: 0.01
        }
      )

      tl.to(child, {
        opacity: 0,
        duration: 4
      })
    })
  }
}
</script>

<template>
  <div class="grid place-items-center h-screen grid-rows-1 grid-cols-1">
    <div class="flex px-5" ref="wrap">
      <div class="corners relative">
        <div
          class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center"
        >
          <span
            v-for="{ title, index } in items"
            class="item block absolute w-5 h-5 rounded-full border-2 border-neutral-light opacity-0 bg-black"
            :key="index"
            ref="bullet"
          >
            <span class="pl-7 text-neutral-light text-sm lg:text-lg">{{
              title
            }}</span>
          </span>
        </div>
        <div
          class="text-tertiary text-sm md:text-lg p-5 md:p-20 text-animation"
        >
          <div>
            <p>Hi, I am</p>
            <p class="title-text text-4xl md:text-7xl py-1">Peter Vavro</p>
            <ul class="relative leading-relaxed list-disc list-outside ml-4">
              <li class="text-primary">
                the full-stack
                <span class="text-secondary"> web & mobile </span>developer;
              </li>
              <li class="h-16 relative">
                <TextCarousel />
              </li>
            </ul>
            <span class="underline underline-offset-1"
              >The developer you're looking for.</span
            >
          </div>
          <div class="border-neutral-light border-t-2 pt-8 mt-8">
            <span class="text-primary-light text-sm md:text-base">
              Please, let me show why you should hire me...
            </span>
            <div class="pt-3">
              <div>
                <i
                  class="p-3 border-primary-light border-r-2 border-b-2 inline-block ml-2 rotate-45 animate-pulse"
                >
                </i>
              </div>
              <div class="-translate-y-4">
                <i
                  class="p-3 border-primary-light border-r-2 border-b-2 inline-block ml-2 rotate-45 animate-pulse"
                >
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-text {
  font-family: 'Staatliches', cursive;
}

.corners {
  background: linear-gradient(
        to right,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      0 0,
    linear-gradient(
        to right,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      0 100%,
    linear-gradient(
        to left,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      100% 0,
    linear-gradient(
        to left,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      100% 100%,
    linear-gradient(
        to bottom,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      0 0,
    linear-gradient(
        to bottom,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      100% 0,
    linear-gradient(
        to top,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      0 100%,
    linear-gradient(
        to top,
        theme('colors.secondary.DEFAULT') 1px,
        transparent 1px
      )
      100% 100%;

  background-repeat: no-repeat;
  background-size: 1rem 1rem;
}
</style>
