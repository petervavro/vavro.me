<script setup>
import { useElementVisibility } from '@vueuse/core'
import JSON_DATA from '~/assets/data/technologies.json'

const target = ref(null)
const targetIsVisible = useElementVisibility(target)

const technologies = ref(
  JSON_DATA.filter(({ preferred }) => preferred).sort((a, b) => a.preferred - b.preferred)
)

const selectedIndex = ref(0)
const loopInterval = ref(null)

const currentYear = new Date().getFullYear()
const maxYears = Math.max(...technologies.value.map(t => currentYear - t.year))

const yearsFor = (t) => currentYear - t.year
const barWidth = (t) => Math.round((yearsFor(t) / maxYears) * 100)

const stopLoop = () => clearInterval(loopInterval.value)

const doSelect = (index, doStopLoop = false) => {
  selectedIndex.value = index
  if (index < technologies.value.length) technologies.value[index].alreadySelected = true
  if (doStopLoop) stopLoop()
}

watch(selectedIndex, (val) => {
  if (val === technologies.value.length) {
    stopLoop()
    selectedIndex.value = 0
  }
})

watch(targetIsVisible, () => {
  if (loopInterval.value === null) {
    loopInterval.value = setInterval(() => doSelect(selectedIndex.value + 1), 3000)
  }
})

onMounted(() => {
  technologies.value[selectedIndex.value].alreadySelected = true
})
</script>

<template>
  <div ref="target" class="tech-list">
    <div
      v-for="(t, index) in technologies"
      :key="t.id"
      class="tech-row"
      :class="{ active: selectedIndex === index }"
      @click="doSelect(index, true)"
    >
      <div class="tech-header">
        <span class="tech-name">{{ t.title }}</span>
        <span class="tech-years">{{ yearsFor(t) }} yrs</span>
      </div>

      <div class="bar-track">
        <div class="bar-fill" :style="{ width: barWidth(t) + '%' }" />
      </div>

      <Transition
        @enter="el => { el.style.height = '0'; el.offsetHeight; el.style.height = el.scrollHeight + 'px' }"
        @after-enter="el => el.style.height = 'auto'"
        @leave="el => { el.style.height = el.scrollHeight + 'px'; el.offsetHeight; el.style.height = '0' }"
      >
        <p v-if="selectedIndex === index" class="tech-note">{{ t.note }}</p>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tech-list {
  @apply flex flex-col gap-1;
}

.tech-row {
  @apply px-3 py-2 cursor-pointer border-l-2 border-transparent transition-all duration-200;

  &:hover {
    @apply border-primary/40;
  }

  &.active {
    @apply border-secondary bg-white/[0.03];
  }
}

.tech-header {
  @apply flex justify-between items-baseline mb-1.5;

  .tech-name {
    @apply text-sm text-white/70 transition-colors duration-200;

    .active & {
      @apply text-secondary;
    }
  }

  .tech-years {
    @apply text-xs text-white/30;

    .active & {
      @apply text-secondary/60;
    }
  }
}

.bar-track {
  @apply h-px bg-white/10 w-full;

  .bar-fill {
    @apply h-full bg-primary/40 transition-all duration-500;

    .active & {
      @apply bg-secondary/60;
    }
  }
}

.tech-note {
  @apply text-xs text-white/40 leading-relaxed mt-2 pr-2;
}

.note-enter-active,
.note-leave-active {
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.note-enter-from,
.note-leave-to {
  opacity: 0;
}

.note-enter-to,
.note-leave-from {
  opacity: 1;
}
</style>
