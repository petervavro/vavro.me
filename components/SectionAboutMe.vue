<script>
import JSON_DATA from 'assets/data/technologies.json'

export default {
  setup() {
    const { target, isVisible } = useIsInViewport()
    const { target: targetDetail, isVisible: isVisibleDetail } =
      useIsInViewport()

    return {
      technologies: JSON_DATA,
      getExperienceYears: (technologyId) => {
        const t = JSON_DATA.find(({ id }) => id === technologyId)
        return t ? new Date().getFullYear() - t.year : 0
      },
      target,
      isVisible,
      targetDetail,
      isVisibleDetail
    }
  }
}
</script>

<template>
  <div class="container mx-auto lg:max-w-4xl">
    <div ref="target">
      <Transition>
        <section
          v-if="isVisible"
          class="p-10 pb-20 max-w-xl bg-secondary drop-shadow-custom"
        >
          <h2 class="pb-5 text-2xl uppercase">Who am I ?</h2>
          <p>
            <strong>
              A Full-Stack Engineer, interested in programming since 1994.
            </strong>
            My main focus nowadays is in creating accessible digital experiences
            using JavaScript / Typescript. It is have been
            {{ getExperienceYears('javascript') }}+ years since I discovered JS
            and I feel comfortable in both, front and back end. My experience in
            front-end web and mobile: React ({{ getExperienceYears('react') }}+
            years), React Native, Vue.js ({{ getExperienceYears('vuejs') }}+
            years), AngularJS and many other interesting frameworks and
            libraries. In back-end, {{ getExperienceYears('nodejs') }}+ years
            with Node.js working with various frameworks and libraries.
          </p>
        </section>
      </Transition>
    </div>
    <div ref="targetDetail">
      <Transition name="detail">
        <section
          v-if="isVisibleDetail"
          class="p-10 bg-neutral max-w-3xl border-secondary border-l border-b border-dotted -translate-y-10 sm:translate-x-20 m-3 sm:m-0"
        >
          <h3 class="pb-5 text-xl text-tertiary">
            Technologies I'm focused on currently
          </h3>
          <ExperienceDetail />
        </section>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.drop-shadow-custom {
  box-shadow: 0px 0px 185px 0px rgba(0, 0, 0, 1);
}

.v-enter-active,
.v-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0 -translate-y-20;
}

.detail-enter-active,
.detail-leave-active {
  @apply sm:translate-x-20 sm:-translate-y-10 transition-all duration-500 ease-in delay-300;
}

.detail-enter-from,
.detail-leave-to {
  @apply opacity-0 translate-y-20;
}
</style>
