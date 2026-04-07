<template>
    <div class="flex flex-col items-center justify-center w-full px-10">
        <div class="flex flex-col items-center max-w-2xl text-center gap-8">

            <div class="role">
                <span class="gradient-text">Full-Stack Engineer</span>
            </div>

            <p class="tagline">
                20+ years crafting <span class="text-secondary">clean, scalable</span>
                web &amp; mobile products.
            </p>

            <div class="stack">
                <span style="animation-delay: 0.1s">TypeScript&nbsp;/&nbsp;Javascript</span>
                <span style="animation-delay: 0.8s">Node.js</span>
                <span style="animation-delay: 1.0s">React</span>
                <span style="animation-delay: 1.2s">Vue</span>
                <span style="animation-delay: 1.4s">AWS</span>
            </div>

            <div class="seeking">
                <p class="seeking-label">Open to New Roles</p>
                <ul>
                    <li>Looking for a <span class="text-secondary">Full-Stack</span> or <span
                            class="text-secondary">Software Engineer</span> position where I can build real products —
                        ideally at a company using or building <span class="text-secondary">AI-powered features</span>.
                    </li>
                    <li>- I'm actively deepening my skills in <span class="text-secondary">LLM application
                            development</span>, and <span
                            class="text-secondary">AI agents</span>.</li>
                </ul>
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
    background-image: radial-gradient(circle,
            theme('colors.primary.light') 0%,
            theme('colors.primary.DEFAULT') 40%,
            theme('colors.secondary.DEFAULT') 100%);
    animation: gradient 8s ease infinite;
    background-size: 300% 300%;
}

.tagline {
    @apply text-sm md:text-lg text-primary leading-relaxed;
}

.stack {
    @apply flex flex-wrap justify-center gap-3;

    span {
        @apply text-sm md:text-base px-4 py-1.5 rounded-full border border-primary/40 text-primary/80 hover:border-primary hover:text-primary transition-colors duration-200;
        opacity: 0;
        animation: fade-in 0.5s ease both;
    }
}

.seeking {
    @apply border border-tertiary/30 px-6 py-4 text-left bg-tertiary/5 max-w-lg;
    animation: fade-in 0.5s ease 2.1s both;

    .seeking-label {
        @apply text-tertiary text-xs uppercase tracking-widest mb-3;
    }

    ul {
        @apply space-y-2;

        li {
            @apply text-xs md:text-sm text-white/60 leading-relaxed pl-3 border-l border-tertiary/30;
        }
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(8px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
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
