<!-- Please remove this file from your project -->
<template>
  <div class="bg-primary-contrast p-5 py-20">
    <div class="container mx-auto lg:max-w-4xl">
      <h1 class="text-3xl pb-5">
        Peter Vavro<br /><small>Full-Stack Engineer / Scrum Master</small>
      </h1>
      <section class="p-10 bg-secondary drop-shadow-xl">
        <h2 class="pb-5 text-2xl drop-shadow-md">About me</h2>
        <p>
          <strong>I am a Full-Stack Engineer / Scrum Master, specialized in JavaScript,
            interested in programming since 1994.</strong> My experience includes 13+ years with JS and I am efficient
          in both, front and back end. In front-end web and mobile: React (<span class="react-years">5</span>+ years),
          React Native (<span class="react-native-years">4</span>+ years), Vue.js, AngularJS and many other interesting
          frameworks and libraries. In back-end, my experience includes
          <span class="nodejs-years">7 </span>+ years with Node.js working with various frameworks such as Express.js,
          Sails.js, LoopBack and HapiJS.
        </p>
      </section>
      <section class="p-10">
        <h2 class="text-2xl pb-2">Technologies</h2>
        <p>My experience includes following technologies:</p>
        <list-technologies />
      </section>
      <section class="p-10 bg-tertiary drop-shadow-xl">
        <h2 class="text-2xl pb-5">Code samples</h2>
        <list-code-samples />
      </section>
      <section class="p-5 sm:p-10 mt-10 bg-secondary drop-shadow-xl">
        <h2 class="text-2xl drop-shadow-md pb-10">Projects</h2>
        <list-projects />
      </section>
    </div>
  </div>
</template>

<script>
import ListTechnologies from './ListTechnologies.vue'
import ListCodeSamples from './ListCodeSamples.vue'
import ListProjects from './ListProjects.vue'

export default {
  components: { ListTechnologies, ListCodeSamples, ListProjects }
}
</script>
