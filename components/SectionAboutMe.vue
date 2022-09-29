
<script>
import JSON_DATA from 'assets/data/technologies.json'

export default {
    data() {
        return {
            technologies: JSON_DATA
        }
    },
    methods: {
        getExperienceYears(technologyId) {
            const t = this.technologies.find(({ id }) => id === technologyId)
            return t ? new Date().getFullYear() - t.year : 0
        }
    }
}
</script>

<template>
    <div>
        <div class="py-28 container mx-auto lg:max-w-4xl">
            <section class="p-10 pb-28 max-w-xl bg-secondary">
                <h2 class="pb-5 text-2xl uppercase">About me</h2>
                <p>
                    <strong>
                        I am a Full-Stack Engineer, interested in programming
                        since 1994.
                    </strong>
                    My main focus these days is building accessible digital
                    experiences using JavaScript / Typescript. It is have been
                    {{ getExperienceYears('javascript') }}+ years since I
                    discovered JS and I feel conformable in both, front and back
                    end written in it. In front-end web and mobile: React ({{
                        getExperienceYears('react')
                    }}+ years), React Native, Vue.js ({{
                        getExperienceYears('vuejs')
                    }}+ years), AngularJS and many other interesting frameworks
                    and libraries. In back-end, my experience includes
                    {{ getExperienceYears('nodejs') }}+ years with Node.js
                    working with various frameworks and libraries.
                </p>
                <!-- Never stop learning -->
            </section>
            <section
                class="p-10 m-3 -mt-20 md:pt-10 md:ml-20 bg-neutral max-w-3xl border-secondary border-l border-r border-dotted"
            >
                <h3 class="pb-5 text-xl drop-shadow-md text-tertiary">
                    Currently, focused technologies:
                </h3>
                <ExperienceDetail />
            </section>
        </div>
    </div>
</template>