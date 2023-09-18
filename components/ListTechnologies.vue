<script setup>
import gsap from 'gsap'
import ITEMS from '~/assets/data/technologies.json'

const ranges = [
  [1994, 1999],
  [2000, 2009],
  [2010, 2023]
]

const selectedRange = ref(2)

const itemsInRange = computed(() =>
  ITEMS.filter(
    ({ year }) =>
      year >= ranges[selectedRange.value][0] &&
      year <= ranges[selectedRange.value][1]
  ).reverse()
)

const selectedYear = ref(2023)

onMounted(() => {
  gsap.to('#techs-list', {
    scrollTrigger: {
      trigger: '#techs-list',
      start: 'top 30%',
      end: 'bottom center',
      toggleActions: 'play none none reverse',
      onUpdate: (self) => {
        const endYear = itemsInRange.value[0].year
        const startYear = itemsInRange.value[itemsInRange.value.length - 1].year

        selectedYear.value = Math.round(
          endYear - self.progress * (endYear - startYear)
        )
      }
    }
  })
})
</script>

<template>
  <div>
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
        <div
          id="techs-list"
          class="p-5 md:p-10 grid grid-flow-row grid-cols-2 md:grid-cols-3 gap-4 md:gap-10"
        >
          <a
            v-for="(t, index) in itemsInRange"
            :key="t.id"
            :data-index="index"
            class="group flex ease-out"
            :href="t.url"
            target="_blank"
          >
            <div>
              <div
                class="text-md origin-bottom -rotate-90 antialiased tracking-widest"
                :class="[
                  selectedYear === t.year
                    ? 'text-primary'
                    : 'text-neutral-light'
                ]"
              >
                {{ t.year }}
              </div>
            </div>
            <the-thumbnail
              v-bind="t"
              class="inline-block text-neutral-light md:group-hover:scale-105 antialiased"
              :titleClasses="[
                'text-left',
                selectedYear === t.year ? 'text-secondary scale-105' : '',
                'group-hover:text-primary'
              ]"
              :thumbnailClasses="[
                'transition-all duration-300',
                'group-hover:bg-primary/50 group-hover:border-primary',
                selectedYear === t.year
                  ? 'bg-secondary/60 border-secondary'
                  : ''
              ]"
              :thumbnailImageClasses="[
                'transition-all duration-500',
                selectedYear === t.year
                  ? 'grayscale-0 opacity-100'
                  : 'grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100'
              ]"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select {
  @apply mb-5 appearance-none box-border bg-no-repeat bg-right w-full p-2 px-5 rounded-full border-2 border-tertiary text-tertiary text-base bg-neutral;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZmlsbDogIzkwY2E3NzsiPjxwYXRoIGQ9Ik0xNDcuNiAyMTAuN2MtNy41IDcuNS03LjUgMTkuOCAwIDI3LjNsOTUuNyA5NS40YzcuMyA3LjMgMTkuMSA3LjUgMjYuNi42bDk0LjMtOTRjMy44LTMuOCA1LjctOC43IDUuNy0xMy43IDAtNC45LTEuOS05LjktNS42LTEzLjYtNy41LTcuNS0xOS43LTcuNi0yNy4zIDBsLTgxIDc5LjgtODEuMS04MS45Yy03LjUtNy41LTE5LjctNy41LTI3LjMuMXoiLz48cGF0aCBkPSJNNDggMjU2YzAgMTE0LjkgOTMuMSAyMDggMjA4IDIwOHMyMDgtOTMuMSAyMDgtMjA4UzM3MC45IDQ4IDI1NiA0OCA0OCAxNDEuMSA0OCAyNTZ6bTMzMi40LTEyNC40QzQxMy43IDE2NC44IDQzMiAyMDkgNDMyIDI1NnMtMTguMyA5MS4yLTUxLjYgMTI0LjRDMzQ3LjIgNDEzLjcgMzAzIDQzMiAyNTYgNDMycy05MS4yLTE4LjMtMTI0LjQtNTEuNkM5OC4zIDM0Ny4yIDgwIDMwMyA4MCAyNTZzMTguMy05MS4yIDUxLjYtMTI0LjRDMTY0LjggOTguMyAyMDkgODAgMjU2IDgwczkxLjIgMTguMyAxMjQuNCA1MS42eiIvPjwvc3ZnPg==);
}
</style>
