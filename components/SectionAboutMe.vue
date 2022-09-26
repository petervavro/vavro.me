<!-- Please remove this file from your project -->
<template>
    <div class="">
        <div class="container mx-auto lg:max-w-4xl">
            <!-- <h1 class="text-3xl pb-5">
				Peter Vavro<br />
				<small> Full-Stack Engineer / Scrum Master </small>
			 </h1> -->
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
                class="p-10 py-28 ml-20 -mt-20 bg-neutral max-w-3xl border-secondary border-l border-r border-dotted"
            >
                <h3 class="pb-5 text-xl drop-shadow-md text-tertiary">
                    I’ve been working with recently:
                </h3>
                <intro-animation />
            </section>
        </div>
        <div class="my-20 py-28 container mx-auto lg:max-w-4xl text-primary">
            <section class="p-10">
                <div class="pb-10">
                    <h2 class="text-2xl pb-2 uppercase">
                        What did I learn and when
                    </h2>
                    <p>My experience includes following technologies:</p>
                </div>
                <list-technologies />
            </section>
        </div>
        <div class="py-28 container mx-auto lg:max-w-4xl">
            <section class="p-10 text-tertiary">
                <h2 class="text-2xl pb-5 uppercase">Samples of my coding</h2>
                <list-code-samples />
            </section>
        </div>
        <div class="py-28 container mx-auto lg:max-w-4xl">
            <section class="p-5 sm:p-10 mt-10 text-secondary">
                <h2 class="text-2xl drop-shadow-md pb-10 uppercase">
                    Things I've helped to build
                </h2>
                <list-projects />
            </section>
        </div>
    </div>
</template>

<script>
import ListTechnologies from './ListTechnologies.vue'
import ListCodeSamples from './ListCodeSamples.vue'
import ListProjects from './ListProjects.vue'
import IntroAnimation from './IntroAnimation.vue'

export default {
    components: {
        ListTechnologies,
        ListCodeSamples,
        ListProjects,
        IntroAnimation
    }
}
</script>
