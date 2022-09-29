<template>
    <div>
        <div class="py-28 container mx-auto lg:max-w-4xl">
            <section class="p-10 pb-28 max-w-xl bg-secondary">
                <h2 class="pb-5 text-2xl uppercase">About me</h2>
                <p>
                    <strong>
                        I am a Full-Stack Engineer / Scrum Master, specialized
                        in JavaScript, interested in programming since 1994.
                    </strong>
                    My experience includes 13+ years with JS and I am efficient
                    in both, front and back end. In front-end web and mobile:
                    React (<span class="react-years"> 5 </span>+ years), React
                    Native (<span class="react-native-years"> 4 </span>+ years),
                    Vue.js, AngularJS and many other interesting frameworks and
                    libraries. In back-end, my experience includes
                    <span class="nodejs-years"> 7 </span>+ years with Node.js
                    working with various frameworks such as Express.js,
                    Sails.js, LoopBack and HapiJS.
                </p>
                <!-- Never stop learning -->
            </section>
            <section
                class="p-10 m-3 -mt-20 md:pt-10 md:ml-20 bg-neutral max-w-3xl border-secondary border-l border-r border-dotted"
            >
                <h3 class="pb-5 text-xl drop-shadow-md text-tertiary">
                    I’ve been working with recently:
                </h3>
                <ExperienceDetail />
            </section>
        </div>
    </div>
</template>

<script>
export default {}
</script>
