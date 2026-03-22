<template>
    <div class="flex flex-col items-center justify-center w-full px-10">
        <div class="flex flex-col items-center max-w-2xl text-center gap-8">

            <div class="role">
                <span class="gradient-text">Full-Stack Engineer</span>
            </div>

            <p class="tagline">
                20+ years crafting <span class="text-secondary">clean, scalable</span>
                web &amp; mobile products.<br>
                Currently <span class="text-tertiary">open to new opportunities</span>.
            </p>

            <div class="stack">
                <span>React</span>
                <span>Vue</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>GraphQL</span>
                <span>AWS</span>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.role {
    @apply text-5xl md:text-7xl font-bold tracking-tight;
}

.gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: radial-gradient(
        circle,
        theme('colors.primary.light') 0%,
        theme('colors.primary.DEFAULT') 40%,
        theme('colors.secondary.DEFAULT') 100%
    );
    animation: gradient 8s ease infinite;
    background-size: 300% 300%;
}

.tagline {
    @apply text-lg md:text-2xl text-primary leading-relaxed;
}

.stack {
    @apply flex flex-wrap justify-center gap-3;

    span {
        @apply text-sm md:text-base px-4 py-1.5 rounded-full border border-primary/40 text-primary/80
               hover:border-primary hover:text-primary transition-colors duration-200;
    }
}

@keyframes gradient {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style>
