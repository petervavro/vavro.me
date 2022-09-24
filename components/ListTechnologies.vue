<template>
    <div class="flex flex-row">
        <div class="flex flex-col sticky top-0">
            <button
                v-for="([rangeStart, rangeEnd], index) in ranges"
                @click="selectedRange = index"
                class="p-3 px-5 text-primary-dark text-current border-l-4 border-primary-dark hover:bg-secondary transition-all"
                :class="{
                    'bg-white border-secondary text-black hover:bg-white':
                        selectedRange === index
                }"
            >
                {{ rangeStart }}&nbsp;-&nbsp;{{ rangeEnd }}
            </button>
        </div>
        <div class="flex flex-col w-full border-l-4 border-tertiary">
            <TransitionGroup
                name="list"
                tag="div"
                class="grid grid-flow-row grid-cols-3 gap-4 bg-primary-dark p-10"
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
                    class="item"
                    v-if="isVisible"
                >
                    <span class="inline-block -rotate-90 text-xs text-white">
                        {{ t.year }}
                    </span>
                    <the-thumbnail v-bind="t" class="inline-block" />
                </a>
            </TransitionGroup>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'

import JSON_DATA from 'assets/data/technologies.json'

export default {
    name: 'ListTechnologies',
    data() {
        return {
            isVisible: false,
            selectedRange: 2,
            ranges: [
                [1994, 1999],
                [2000, 2009],
                [2010, 2022]
            ],
            items: JSON_DATA.map((item) => ({
                ...item,
                thumbnailImage: item?.thumbnailImage
                    ? `assets/${item.thumbnailImage}`
                    : undefined
            })).reverse()
        }
    },
    mounted() {
        this.isVisible = true
    },
    computed: {
        getItemsInRange() {
            return this.items.filter(
                ({ year }) =>
                    year >= this.ranges[this.selectedRange][0] &&
                    year <= this.ranges[this.selectedRange][1]
            )
        }
    },
    methods: {
        onBeforeEnter(el) {
            el.style.opacity = 0
        },
        onEnter(el, done) {
            gsap.to(el, {
                opacity: 1,
                delay: el.dataset.index * 0.15,
                onComplete: done
            })
        },
        onLeave(el, done) {
            gsap.to(el, {
                opacity: 0,
                onComplete: done
            })
        }
    }
}
</script>
