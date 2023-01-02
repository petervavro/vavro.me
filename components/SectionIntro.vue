<script>
import gsap from 'gsap'
import JSON_DATA from '~/assets/data/technologies.json'

const items = JSON_DATA.filter(({ preferred }) => preferred).sort(
  (a, b) => a.preferred - b.preferred
)

export default {
  data() {
    return {
      isVisible: false,
      show: false,
      items,
      zeroOrOneAnimationElements: [
        ...Array(5 * 5)
          .fill()
          .map(() => ({
            id: Math.floor(Math.random() * 100000),
            value: Math.round(Math.random())
          }))
      ]
    }
  },
  methods: {
    changeZeroOrOneAnimationOrder: function () {
      this.zeroOrOneAnimationElements.sort(() => (Math.random() > 0.5 ? 1 : -1))
    }
  },
  mounted() {
    var tl = gsap.timeline({
      onComplete: () => {
        this.$nextTick(function () {
          this.show = true
        })
        this.isVisible = true
      }
    })

    this.$refs.blocks.forEach((element) =>
      tl
        .to(element, {
          transformOrigin: '50% 50%',
          duration: 0.5,
          rotation: 360,
          opacity: 1
        })
        .to(element, { duration: 0.3, opacity: 0 })
    )

    setInterval(
      function () {
        this.changeZeroOrOneAnimationOrder()
      }.bind(this),
      2000
    )
  }
}
</script>

<template>
  <div
    class="grid place-items-center h-screen grid-rows-1 grid-cols-1"
    ref="canvas"
  >
    <div
      class="flex justify-center items-center rounded-full border-2 border-secondary text-secondary w-80 h-80"
      v-if="!isVisible"
    >
      <span
        v-for="{ title, index } in items"
        class="block absolute text-3xl opacity-0"
        ref="blocks"
        :key="index"
      >
        {{ title }}
      </span>
    </div>
    <Transition>
      <div v-if="isVisible">
        <div class="flex py-10 mt-10 sm:mt-0">
          <div class="w-1/3 px-5">
            <TransitionGroup
              name="list"
              tag="div"
              class="grid grid-cols-5 lg:gap-4 text-primary"
            >
              <div
                v-for="{ value, id } in zeroOrOneAnimationElements"
                :key="id"
                class="text-center"
              >
                {{ value }}
              </div>
            </TransitionGroup>
          </div>
          <div class="w-2/3">
            <div
              class="py-5 sm:py-14 px-5 sm:pl-7 text-tertiary text-lg border-neutral-light/50 border-l-2"
              :class="{ show }"
            >
              <div style="--delay: 0">
                <p :style="`--index: 0;`">Hi, I am</p>
                <p :style="`--index: 1;`" class="text-6xl py-1">Peter Vavro</p>
                <p :style="`--index: 2;`">
                  the full-stack
                  <span class="text-secondary"> web & mobile </span>
                  developer you're looking for.
                </p>
              </div>
              <div style="--delay: 1.5" class="pt-10">
                <span
                  :style="`--index: 0;`"
                  class="text-primary-light transition-all"
                >
                  Please, let me show why you should hire me...
                </span>
              </div>
            </div>
            <i
              class="p-3 border-primary-light border-r-2 border-b-2 inline-block -ml-3 rotate-45 animate-pulse"
            >
            </i>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
p {
  @apply opacity-0 duration-500 ease-out transition-all translate-x-0 translate-y-1/2;
}

.show p {
  @apply opacity-100 translate-x-0 translate-y-0;
  transition-delay: calc(var(--delay) * 1s + 0.3s * var(--index));
}

.v-enter-active,
.v-leave-active {
  @apply transition duration-500 ease-out;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0 transition duration-500 ease-out;
}

.list-move,
.list-enter-active,
.list-leave-active {
  @apply blur-[2px] transition-all duration-500 ease-out;
}

.list-enter-from,
.list-leave-to {
  @apply opacity-0 translate-x-64;
}

.list-leave-active {
  @apply absolute;
}
</style>
