<script setup lang="ts">
// Inspiration: https://codepen.io/GreenSock/pen/bGexQpq

const { $gsap } = useNuxtApp();
const route = useRoute();
const { decrypt } = useEncryption();

const token = route.params.token as string;

const { data, error, status } = await decrypt(token)

const config = computed(() => data.value && JSON.parse(data.value))

const { gtag } = useGtag()

onMounted(() => {
    const panelsContainer = document.querySelector<HTMLElement>("#panels-container");
    let tween: gsap.core.Tween | null = null;

    if (panelsContainer) {

        const panels = $gsap.utils.toArray<HTMLElement>("#panels-container .panel");

        document.querySelectorAll(".anchor").forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const elLink = (e.target as Element)
                const panelId = elLink.getAttribute("href")

                if (panelId) {

                    let targetElem = document.querySelector(panelId) as HTMLElement,
                        y;

                    if (targetElem && panelsContainer.isSameNode(targetElem.parentElement) && tween?.scrollTrigger) {

                        let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
                            totalMovement = (panels.length - 1) * targetElem.offsetWidth;

                        y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);

                        const partIndex = elLink.getAttribute('data-step-index')

                        if (partIndex) gtag('event', 'cover-letter', {
                            partIndex: elLink.getAttribute('data-step-index'),
                            like: elLink.getAttribute('data-liked') === ''
                        })
                    }

                    $gsap.to(window, {
                        scrollTo: {
                            y: y,
                            autoKill: false
                        },
                        duration: 1
                    });
                }
            })
        });

        // Panels Animation
        tween = $gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#panels-container",
                pin: true,
                start: "top top",
                scrub: 1,
                // snap: {
                //   snapTo: 1 / (panels.length - 1),
                //   inertia: false,
                //   duration: { min: 0.1, max: 0.1 },
                // },
                end: () => `+=${panelsContainer.offsetWidth - window.innerWidth}`,
            },
        });
    }
});

import TECHNOLOGIES from '~/assets/data/technologies.json'
import type { Technology } from '~/types';

const technologies = ref<Technology[]>([]);

watch(config, (newConfig) => {
    if (newConfig) {
        technologies.value = newConfig?.technologies.map((tId: string) =>
            TECHNOLOGIES.find(({ id }) => id === tId)
        ).filter(Boolean) as Technology[];
    }
}, { immediate: true });

</script>

<template>
    <div id="page" class="flex flex-col min-h-screen">
        <main id="content">
            <section class="flex flex-col justify-center items-center w-full h-screen text-primary overflow-hidden">
                <div class="w-2/5">
                    <div>
                        <h1 class="pb-3 text-4xl font-bold font-sans">Cover Letter</h1>
                        <p>Welcome! I'm thrilled you're here. This dynamic cover letter is designed to offer a unique
                            experience for <span v-if="config.name">{{ config.name }}</span><span v-else>your
                                company</span>. I hope it provides a glimpse into my skills and personality.</p>
                        <p class="pt-3">Best of luck to you on your exploration, and I hope you enjoy the journey.</p>
                    </div>
                    <div class="pt-3">
                        <NuxtLink to="#intro" class="btn inline-block">Start</NuxtLink>
                    </div>
                </div>
            </section>
            <section id="panels" class="w-full">
                <div id="panels-container" class="flex justify-center items-center h-screen overflow-hidden"
                    :style="{ width: `${6 * 100}%` }">
                    <article id="intro"
                        class="panel flex flex-col justify-center items-center w-full h-screen text-black">
                        <div class="flex justify-center items-center">
                            <div class="translate-y-72 relative pointer-events-none">
                                <CoverLetter :prevButtons="false" :nextButtons="false" />
                            </div>
                            <div>
                                <NuxtLink to="#intro" class="btn inline-block leading-none">OK,&nbsp;Next</NuxtLink>
                            </div>
                        </div>
                    </article>
                    <article id="my-journey"
                        class="panel flex flex-col justify-center items-center w-full h-screen text-white">
                        <div class="flex justify-center items-center">
                            <div class="w-1/2 flex divide-x divide-dotted divide-tertiary">
                                <h2 class="p-5 text-4xl text-tertiary font-serif font-semibold text-right">My Journey
                                </h2>
                                <div class="p-5 flex flex-col">
                                    <p class="pb-5">
                                        My professional journey has been deeply rooted in creating scalable, secure, and
                                        reliable code for
                                        public-facing applications.
                                    </p>
                                    <div>
                                        <ul class="list-square list-inside pt-5 border-t border-dotted border-tertiary">
                                            <li>
                                                Previous roles included responsibilities such as developing and
                                                maintaining
                                                complex front-end
                                                systems, ensuring high-quality user experiences for thousands of users.
                                            </li>
                                            <li v-if="config.isFrontEndPosition">I have a keen eye for detail and a deep
                                                understanding of UX
                                                principles, which has consistently allowed me to exceed user
                                                expectations.
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <NuxtLink to="#my-expertise" class="btn inline-block">Next</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="my-expertise"
                        class="panel flex flex-col justify-center items-center w-full h-screen text-white">
                        <div class="flex justify-center items-center">
                            <div class="w-3/5 flex flex-col divide-x divide-dotted divide-primary">
                                <h2 class="pb-5 text-4xl text-primary font-serif font-semibold">Technologies</h2>
                                <div class="p-5 flex flex-col">
                                    <p class="pb-5">
                                        Throughout my career, I've had the opportunity to work with a wide array of
                                        technologies. Here are
                                        some of the key technologies most applicable to this role:
                                    </p>
                                    <div class="py-5 flex w-fit flex-wrap gap-1">
                                        <the-thumbnail v-for="t in technologies" v-bind="t"
                                            class="p-3 inline-block scale-90 border-secondary"
                                            titleClasses="text-primary/90 group-hover:text-secondary text-center"
                                            thumbnailClasses="shadow-in border-primary" />
                                    </div>
                                    <div class="pt-10">
                                        <NuxtLink to="#collaboration" class="btn">Next</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="collaboration"
                        class="panel flex flex-col justify-center items-center w-full h-screen text-white">
                        <div class="flex justify-center items-center">
                            <div class="w-1/2 flex flex-row-reverse ">
                                <h2
                                    class="p-5 text-4xl text-secondary font-serif font-semibold border-l border-dotted border-secondary">
                                    A Collaborative
                                    Approach to Product Development</h2>
                                <div class="p-5 flex flex-col">
                                    <p class="pb-5">
                                        Through close collaboration with cross-functional teams, including product
                                        managers and designers, I
                                        have consistently taken features from conception to production. By encouraging
                                        best practices
                                        through regular code reviews, technical discussions, and Agile methodologies
                                        such as Scrum, I ensure
                                        that high-impact solutions are delivered efficiently and on time.
                                    </p>
                                    <div>
                                        <NuxtLink to="#mentorship" class="btn">Next</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="mentorship"
                        class="panel flex flex-col justify-center items-center w-full h-screen text-white">
                        <div class="flex justify-center items-center">
                            <div class="w-1/2 flex divide-x divide-dotted divide-tertiary">
                                <h2 class="p-5 text-4xl text-tertiary font-serif font-semibold text-right">Mentoring for
                                    Success</h2>
                                <div class="p-5 flex flex-col">
                                    <p class="pb-5">
                                        Leadership and mentorship have been significant aspects of my career. I have
                                        guided my colleagues to
                                        deliver high-quality software products while fostering a culture of continuous
                                        learning and
                                        innovation.
                                    </p>
                                    <div>
                                        <NuxtLink to="#skills-for-you" class="btn">Next</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="skills-for-you"
                        class="panel flex flex-col justify-center items-center w-full h-screen text-white">
                        <div class="flex justify-center items-center">
                            <div class="w-1/2 flex flex-row-reverse">
                                <h2
                                    class="p-5 text-4xl text-tertiary font-serif font-semibold w-full border-l border-dotted border-tertiary">
                                    Skills
                                    for<br /><span v-if="config.name">{{ config.name }}</span><span v-else>your
                                        company</span>'s Mission</h2>
                                <div class="p-5 flex flex-col">
                                    <p class="pb-5">
                                        My technical expertise, mentorship experience, and a passion for continuous
                                        improvement positions me
                                        to make a valuable contribution to your team.
                                        I am eager to contribute to <span v-if="config.name">{{ config.name
                                            }}</span><span v-else>your
                                            company</span>'s success by delivering impactful and innovative solutions.
                                    </p>
                                    <div>
                                        <NuxtLink to="#follow-up" class="btn">Next</NuxtLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section id="follow-up" class="flex justify-center items-center h-screen bg-secondary">
                <div class="w-2/5">
                    <h2 class="text-xl font-bold pb-3">Thank you for your time and consideration.</h2>
                    <p class="pb-3">
                        I look forward to the opportunity to further discuss how my skills
                        and experiences align with the needs of your team.
                    </p>
                    <p class="mb-4">Sincerely,<br>Ing. Peter Vavro</p>
                    <div class="mt-10 flex">
                        <NuxtLink to="/" class="btn text-sm">☛ My online portfolio is available here ☚</NuxtLink>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<style scoped lang="scss">
.btn {
    @apply mt-2 p-2 transition duration-200 border border-white/20 bg-white/10 hover:bg-white/20 text-white
}
</style>
