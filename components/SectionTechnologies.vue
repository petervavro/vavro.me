<script>
import gsap from 'gsap'
import { ref } from 'vue'

import JSON_DATA from 'assets/data/technologies.json'

export default {
    setup() {
        const selectedRange = ref(2)

        const items = JSON_DATA.map((item) => ({
            ...item,
            thumbnailImage: item?.thumbnailImage
                ? `assets/${item.thumbnailImage}`
                : undefined
        })).reverse()

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

        const { target, isVisible } = useIsInViewport()

        return {
            items,
            ranges,
            target,
            isVisible,
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
    }
}
</script>

<style scoped>
.title-enter-active,
.title-leave-active {
    @apply transition delay-1000 duration-500 ease-in-out;
}

.title-enter-from,
.title-leave-to {
    @apply opacity-0;
}

.range {
    @apply inline-block m-1 p-2 px-5 rounded-full border-2 border-tertiary text-tertiary opacity-60 text-sm transition-all hover:opacity-100;
}

.range.selected {
    @apply border-secondary text-secondary opacity-100;
}
</style>

<template>
    <div ref="target">
        <div class="my-20 py-28 container mx-auto lg:max-w-4xl text-primary">
            <section class="p-10">
                <Transition name="title">
                    <div class="pb-10" v-if="isVisible">
                        <h2 class="text-2xl pb-2 uppercase">
                            What did I learn and when
                        </h2>
                        <p>My experience includes following technologies:</p>
                    </div>
                </Transition>
                <div class="flex flex-row">
                    <div class="flex flex-col p-5">
                        <button
                            v-for="([rangeStart, rangeEnd], index) in ranges"
                            @click="selectedRange = index"
                            :class="[
                                'range',
                                selectedRange === index ? 'selected' : ''
                            ]"
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
                            class="grid grid-flow-row grid-cols-3 gap-4 p-10"
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
                                <span
                                    class="inline-block -rotate-90 text-xs text-terniary"
                                >
                                    {{ t.year }}
                                </span>
                                <the-thumbnail
                                    v-bind="t"
                                    class="inline-block text-secondary"
                                />
                            </a>
                        </TransitionGroup>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>