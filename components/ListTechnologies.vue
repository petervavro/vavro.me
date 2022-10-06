<script>
import gsap from 'gsap'
import { ref } from 'vue'

import JSON_DATA from 'assets/data/technologies.json'

const items = JSON_DATA.map((item) => ({
    ...item,
    thumbnailImage: new URL(`../assets/${item.thumbnailImage}`, import.meta.url)
        .href
})).reverse()

export default {
    setup() {
        const isVisible = ref(false)
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

        return {
            isVisible,
            items,
            ranges,
            selectedRange,
            getItemsInRange,
            onBeforeEnter: (el) => {
                el.style.opacity = 0
            },
            onEnter: (el, done) => {
                gsap.to(el, {
                    opacity: 1,
                    delay: el.dataset.index * 0.15,
                    onComplete: done
                })
            },
            onLeave: (el, done) => {
                gsap.to(el, {
                    opacity: 0,
                    onComplete: done
                })
            }
        }
    },
    mounted() {
        this.isVisible = true
    }
}
</script>

<template>
    <select class="select md:hidden" v-model="selectedRange">
        <option
            v-for="([rangeStart, rangeEnd], index) in ranges"
            v-bind:value="index"
        >
            {{ rangeStart }}&nbsp;-&nbsp;{{ rangeEnd }}
        </option>
    </select>
    <div class="flex flex-row">
        <div class="hidden md:flex flex-col p-5">
            <button
                v-for="([rangeStart, rangeEnd], index) in ranges"
                @click="selectedRange = index"
                :class="['range', selectedRange === index ? 'selected' : '']"
            >
                {{ rangeStart }}&nbsp;-&nbsp;{{ rangeEnd }}
            </button>
        </div>
        <div
            class="flex flex-col w-full border-l border-tertiary border-dotted"
        >
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
                    :href="t.url"
                    target="_blank"
                    v-for="(t, index) in getItemsInRange"
                    :key="t.id"
                    :data-index="index"
                    class="group opacity-90"
                    v-if="isVisible"
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
.range {
    @apply inline-block m-1 p-2 px-5 rounded-full border-2 border-tertiary text-tertiary opacity-60 text-sm transition-all hover:opacity-100;
}

.range.selected {
    @apply border-secondary text-secondary opacity-100;
}
.select {
    @apply mb-5 appearance-none box-border bg-no-repeat bg-right w-full p-2 px-5 rounded-full border-2 border-tertiary text-tertiary text-base bg-neutral;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZmlsbDogIzkwY2E3NzsiPjxwYXRoIGQ9Ik0xNDcuNiAyMTAuN2MtNy41IDcuNS03LjUgMTkuOCAwIDI3LjNsOTUuNyA5NS40YzcuMyA3LjMgMTkuMSA3LjUgMjYuNi42bDk0LjMtOTRjMy44LTMuOCA1LjctOC43IDUuNy0xMy43IDAtNC45LTEuOS05LjktNS42LTEzLjYtNy41LTcuNS0xOS43LTcuNi0yNy4zIDBsLTgxIDc5LjgtODEuMS04MS45Yy03LjUtNy41LTE5LjctNy41LTI3LjMuMXoiLz48cGF0aCBkPSJNNDggMjU2YzAgMTE0LjkgOTMuMSAyMDggMjA4IDIwOHMyMDgtOTMuMSAyMDgtMjA4UzM3MC45IDQ4IDI1NiA0OCA0OCAxNDEuMSA0OCAyNTZ6bTMzMi40LTEyNC40QzQxMy43IDE2NC44IDQzMiAyMDkgNDMyIDI1NnMtMTguMyA5MS4yLTUxLjYgMTI0LjRDMzQ3LjIgNDEzLjcgMzAzIDQzMiAyNTYgNDMycy05MS4yLTE4LjMtMTI0LjQtNTEuNkM5OC4zIDM0Ny4yIDgwIDMwMyA4MCAyNTZzMTguMy05MS4yIDUxLjYtMTI0LjRDMTY0LjggOTguMyAyMDkgODAgMjU2IDgwczkxLjIgMTguMyAxMjQuNCA1MS42eiIvPjwvc3ZnPg==);
}
</style>