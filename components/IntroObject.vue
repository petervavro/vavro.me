<template>
    <div class="flex flex-col items-center justify-center w-full px-10">
        <div
            class="p-3 md:w-3/5 flex flex-wrap gap-3 wrapper divide-y divide-dotted divide-neutral-light border-l border-dotted border-neutral-light">
            <div>Innovation</div>
            <div class="large-screen-only">Solutions</div>
            <div>Efficiency</div>
            <div class="large-screen-only">Optimization</div>
            <div class="large-screen-only">Architecture</div>
            <div class="highlight">
                full-stack
                <span class="text-secondary"> web & mobile </span>engineer;
            </div>
            <div>Reliability</div>
            <div>Initiative</div>
            <div class="large-screen-only">Scalability</div>
            <div class="highlight">
                <span class="text-secondary">analytical</span> and <span class="text-secondary">critical
                    thinking;</span>
            </div>
            <div class="large-screen-only">Commitment</div>
            <div>Quality</div>
            <div class="large-screen-only">Evolution</div>
            <div>Learning</div>
            <div>Adaptability</div>
            <div class="large-screen-only">Growth</div>
            <div class="highlight">
                <span class="text-secondary">clean, tested code</span>;
            </div>
            <div>Vision</div>
            <div>Teamwork</div>
            <div class="highlight">
                <span class="text-secondary">self-starter</span>;
            </div>
            <div>Communication</div>
            <div class="highlight">
                <span class="text-secondary">deliver on time</span>;
            </div>
            <div class="large-screen-only">Leadership</div>
            <div class="large-screen-only">Synergy</div>
            <div class="large-screen-only">Partnership</div>
            <div class="highlight">ability to execute <span class="text-secondary">new ideas</span> with
                autonomy;</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    @apply bg-clip-text text-transparent;

    background-image: radial-gradient(circle, theme('colors.neutral.DEFAULT / 75%') 0%, theme('colors.tertiary / 75%') 45%, theme('colors.primary.DEFAULT / 75%') 65%, theme('colors.secondary.DEFAULT / 75%') 100%);
    animation: gradient 10s ease infinite;
    background-size: 400% 400%;

    >div {
        @apply text-center text-xs xl:text-xl p-2 px-3 transition-all duration-300;

        &.large-screen-only {
            @apply hidden md:block
        }

        &.highlight {
            @apply text-primary xl:text-lg;
        }
    }
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>