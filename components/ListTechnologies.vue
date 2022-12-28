<script setup>
import gsap from 'gsap'
import JSON_DATA from 'assets/data/technologies.json'

const items = JSON_DATA.map((item) => ({
  ...item,
  thumbnailImage: `/assets/${item.thumbnailImage}`
})).reverse()

const selectedRange = ref(2)

const ranges = [
  [1994, 1999],
  [2000, 2009],
  [2010, 2022]
]

const getItemsInRange = computed(() => {
  return items.filter(
    ({ year }) =>
      year >= ranges[selectedRange.value][0] &&
      year <= ranges[selectedRange.value][1]
  )
})

const onBeforeEnter = (el) => {
  el.style.opacity = 0
}

const onEnter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    onComplete: done
  })
}
</script>

<template>
  <select class="select md:hidden" v-model="selectedRange">
    <option
      v-for="([rangeStart, rangeEnd], index) in ranges"
      v-bind:value="index"
      :key="index"
    >
      {{ rangeStart }}&nbsp;-&nbsp;{{ rangeEnd }}
    </option>
  </select>
  <div class="flex flex-row">
    <div class="hidden md:flex flex-col p-5">
      <button
        v-for="([rangeStart, rangeEnd], index) in ranges"
        @click="selectedRange = index"
        :class="[
          'inline-block m-3 p-2 px-5 rounded-full border-2 text-sm transition-all hover:opacity-100',
          selectedRange === index
            ? 'border-secondary text-secondary opacity-100'
            : 'border-tertiary text-tertiary opacity-60'
        ]"
        :key="index"
      >
        {{ rangeStart }}&nbsp;-&nbsp;{{ rangeEnd }}
      </button>
    </div>
    <div class="flex flex-col w-full border-l border-tertiary border-dotted">
      <TransitionGroup
        name="list"
        tag="div"
        class="p-5 md:p-10 grid grid-flow-row grid-cols-2 md:grid-cols-3 gap-4"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <a
          v-for="(t, index) in getItemsInRange"
          :key="t.id"
          :data-index="index"
          class="group opacity-0 transition-all duration-500 ease-out"
          :href="t.url"
          target="_blank"
          v-display-when-in-view
        >
          <span class="inline-block -rotate-90 text-xs text-terniary">
            {{ t.year }}
          </span>
          <the-thumbnail
            v-bind="t"
            class="inline-block text-secondary md:group-hover:scale-105 transition"
          />
        </a>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.select {
  @apply mb-5 appearance-none box-border bg-no-repeat bg-right w-full p-2 px-5 rounded-full border-2 border-tertiary text-tertiary text-base bg-neutral;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZmlsbDogIzkwY2E3NzsiPjxwYXRoIGQ9Ik0xNDcuNiAyMTAuN2MtNy41IDcuNS03LjUgMTkuOCAwIDI3LjNsOTUuNyA5NS40YzcuMyA3LjMgMTkuMSA3LjUgMjYuNi42bDk0LjMtOTRjMy44LTMuOCA1LjctOC43IDUuNy0xMy43IDAtNC45LTEuOS05LjktNS42LTEzLjYtNy41LTcuNS0xOS43LTcuNi0yNy4zIDBsLTgxIDc5LjgtODEuMS04MS45Yy03LjUtNy41LTE5LjctNy41LTI3LjMuMXoiLz48cGF0aCBkPSJNNDggMjU2YzAgMTE0LjkgOTMuMSAyMDggMjA4IDIwOHMyMDgtOTMuMSAyMDgtMjA4UzM3MC45IDQ4IDI1NiA0OCA0OCAxNDEuMSA0OCAyNTZ6bTMzMi40LTEyNC40QzQxMy43IDE2NC44IDQzMiAyMDkgNDMyIDI1NnMtMTguMyA5MS4yLTUxLjYgMTI0LjRDMzQ3LjIgNDEzLjcgMzAzIDQzMiAyNTYgNDMycy05MS4yLTE4LjMtMTI0LjQtNTEuNkM5OC4zIDM0Ny4yIDgwIDMwMyA4MCAyNTZzMTguMy05MS4yIDUxLjYtMTI0LjRDMTY0LjggOTguMyAyMDkgODAgMjU2IDgwczkxLjIgMTguMyAxMjQuNCA1MS42eiIvPjwvc3ZnPg==);
}
</style>
