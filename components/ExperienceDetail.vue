<script setup>
import JSON_DATA from 'assets/data/technologies.json'

const target = ref(null)
const targetIsVisible = useElementVisibility(target)

const technologies = ref(
  JSON_DATA.filter(({ preferred }) => preferred).sort(
    (a, b) => a.preferred - b.preferred
  )
)

const selectedIndex = ref(0)
const loopInterval = ref(null)

const stopLoop = () => {
  clearInterval(loopInterval.value)
}

const doSelect = (selectIndex, doStopLoop = false) => {
  selectedIndex.value = selectIndex

  if (selectIndex < technologies.value.length) {
    technologies.value[selectIndex].alreadySelected = true
  }

  if (doStopLoop) stopLoop()
}

watch(selectedIndex, (newValue) => {
  if (technologies.value.length === newValue) {
    stopLoop()
    selectedIndex.value = 0
  }
})

watch(targetIsVisible, (newValue, oldValue) => {
  if (loopInterval.value === null) {
    loopInterval.value = setInterval(() => {
      doSelect(selectedIndex.value + 1)
    }, 3000)
  }
})

onMounted(() => {
  technologies.value[selectedIndex.value].alreadySelected = true
})
</script>

<template>
  <select
    class="select md:hidden pb-5"
    @click="stopLoop()"
    @change="doSelect(parseInt($event.target.value, 10), true)"
    v-model="selectedIndex"
  >
    <option
      v-for="(t, index) in technologies"
      v-bind:value="index"
      :key="index"
    >
      {{ t.title }}
    </option>
  </select>
  <div class="flex flex-col sm:flex-row-reverse">
    <div class="sm:pl-5 hidden md:block">
      <div>
        <button
          v-for="(t, index) in technologies"
          :key="t.id"
          :class="[
            'technology',
            selectedIndex === index ? 'selected' : '',
            t?.alreadySelected === true ? 'active' : 'inactive'
          ]"
          @click="doSelect(index, true)"
        >
          {{ t.title }}
        </button>
      </div>
    </div>
    <div class="pt-3 pr-5 flex-1 text-secondary" ref="target">
      <TransitionGroup name="list" tag="ul" class="relative">
        <li
          v-for="(item, index) in technologies"
          :key="`content-${item.id}`"
          v-show="selectedIndex === index"
        >
          <h4
            class="text-lg pb-3 hidden md:block border-tertiary border-b border-dotted"
          >
            {{ item.title }}
          </h4>
          <div class="text-base pt-3">
            <p>
              since {{ item.year }}&nbsp;|&nbsp;{{
                new Date().getFullYear() - item.year
              }}
              years ago.
            </p>
            <p class="pt-3 h-64 sm:h-32">
              {{ item.note }}
            </p>
          </div>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition-opacity duration-500 ease-out;
}

.list-enter-from,
.list-leave-from,
.list-leave-to {
  @apply opacity-0;
}

.list-leave-active {
  position: absolute;
}

.select {
  @apply appearance-none box-border bg-no-repeat bg-right w-full p-2 px-5 rounded-full border-2 border-tertiary text-tertiary text-base bg-neutral;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZmlsbDogIzkwY2E3NzsiPjxwYXRoIGQ9Ik0xNDcuNiAyMTAuN2MtNy41IDcuNS03LjUgMTkuOCAwIDI3LjNsOTUuNyA5NS40YzcuMyA3LjMgMTkuMSA3LjUgMjYuNi42bDk0LjMtOTRjMy44LTMuOCA1LjctOC43IDUuNy0xMy43IDAtNC45LTEuOS05LjktNS42LTEzLjYtNy41LTcuNS0xOS43LTcuNi0yNy4zIDBsLTgxIDc5LjgtODEuMS04MS45Yy03LjUtNy41LTE5LjctNy41LTI3LjMuMXoiLz48cGF0aCBkPSJNNDggMjU2YzAgMTE0LjkgOTMuMSAyMDggMjA4IDIwOHMyMDgtOTMuMSAyMDgtMjA4UzM3MC45IDQ4IDI1NiA0OCA0OCAxNDEuMSA0OCAyNTZ6bTMzMi40LTEyNC40QzQxMy43IDE2NC44IDQzMiAyMDkgNDMyIDI1NnMtMTguMyA5MS4yLTUxLjYgMTI0LjRDMzQ3LjIgNDEzLjcgMzAzIDQzMiAyNTYgNDMycy05MS4yLTE4LjMtMTI0LjQtNTEuNkM5OC4zIDM0Ny4yIDgwIDMwMyA4MCAyNTZzMTguMy05MS4yIDUxLjYtMTI0LjRDMTY0LjggOTguMyAyMDkgODAgMjU2IDgwczkxLjIgMTguMyAxMjQuNCA1MS42eiIvPjwvc3ZnPg==);
}

.technology.active {
  @apply border-tertiary text-tertiary opacity-60;
}

.technology.inactive {
  @apply border-neutral-light text-neutral-light;
}

.technology.selected {
  @apply border-secondary text-secondary opacity-100 hover:text-secondary hover:border-secondary;
}

.technology {
  @apply block overflow-hidden m-3 p-2 px-5 rounded-full border-2 text-sm transition-all duration-300 opacity-100 hover:text-tertiary hover:border-tertiary hover:opacity-100;
}
</style>
