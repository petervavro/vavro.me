<script setup lang="ts">
const { $gsap } = useNuxtApp()
import JSON_DATA from '~/assets/data/technologies.json';
import type { Technology } from '~/types';

const items: Technology[] = JSON_DATA.filter(({ preferred }) => preferred).sort(
    (a, b) => a.preferred - b.preferred
);

let elCoordinates: [number, number][] = [
    [-130, -100],
    [50, -110],
    [-170, -120],
    [0, -90]
];

onMounted(() => {

    if (window.innerWidth < 640) {
        elCoordinates = [
            [-100, 0],
            [-80, 40],
            [50, 0],
            [0, 42]
        ];
    }

    const vm = getCurrentInstance();

    $gsap.utils.toArray<HTMLElement>('.bullet-hole').forEach((child, index) => {

        const tl = $gsap.timeline({
            repeat: -1,
            repeatDelay: 10,
            delay: 1 + (1 + index)
        }).set(child, {
            opacity: 0,
            x: elCoordinates[index][0],
            y: elCoordinates[index][1]
        }).to(child, {
            opacity: 1,
            duration: 0.2
        })

        if (vm && vm.vnode.el) {

            const wrapper = vm.vnode.el.parentElement as HTMLElement

            // Shake wrapper
            tl
                .set(wrapper, {
                    scale: 1,
                    opacity: 1
                })
                .fromTo(
                    wrapper,
                    {
                        x: -5,
                        scale: 0.99,
                        opacity: 1
                    },
                    {
                        x: 5,
                        scale: 1,
                        opacity: 1,
                        clearProps: 'all',
                        repeat: 5,
                        duration: 0.01
                    }
                ).fromTo(
                    wrapper,
                    { y: -5, opacity: 1 },
                    {
                        y: 5,
                        opacity: 1,
                        clearProps: 'all',
                        repeat: 5,
                        duration: 0.01
                    }
                )
        }

        // Bullet hole should disapear
        tl.to(child, {
            opacity: 0,
            duration: 4
        });

    })
})

</script>

<template>
    <div class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <span v-for="(item, index) in items" class="bullet-hole block absolute w-10 h-10 bg-black opacity-0"
            :key="index">
            <span class="ml-9 p-1 px-2 bg-neutral-light text-white rounded text-sm lg:text-lg">{{ item.title }}</span>
        </span>
    </div>
</template>

<style scoped>
.bullet-hole {
    background: theme('colors.black');
    background: radial-gradient(circle,
            theme('colors.black') 29%,
            theme('colors.gray.700') 30%,
            transparent 67%);
}
</style>