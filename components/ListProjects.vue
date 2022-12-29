<script setup>
import TECHNOLOGIES from 'assets/data/technologies.json'
import JSON_DATA from 'assets/data/projects.json'

const selectedProjectId = ref(false)
const items = ref(
  JSON_DATA.map((item) => ({
    ...item,
    ...(item?.backgroundImage && {
      backgroundImage: `/assets/${item.backgroundImage}`
    })
  }))
)

const projectData = computed(() => {
  const project = items.value.find(({ id }) => id === selectedProjectId.value)
  return {
    ...project,
    technologies: TECHNOLOGIES.filter(({ id }) =>
      project.technologies.split(',').includes(id)
    ).map((t) => ({
      ...t,
      ...(t?.thumbnailImage && {
        thumbnailImage: new URL(
          `../assets/${t.thumbnailImage}`,
          import.meta.url
        ).href
      })
    }))
  }
})
</script>

<template>
  <modal
    :show="selectedProjectId"
    @close="selectedProjectId = false"
    modalContentClass="bg-neutral text-secondary"
    buttonClass="text-white/50 hover:text-white hover:bg-neutral-light border-white/50"
  >
    <article class="box mx-auto max-w-4xl md:p-10 pt-5">
      <div class="p-10">
        <h3 class="text-2xl pb-3">{{ projectData.title }}</h3>
        <section class="pb-5">
          <h4 class="pb-1">PROJECT DESCRIPTION</h4>
          <p class="pb-1">{{ projectData.description }}</p>
          <a
            :href="projectData.url"
            target="_blank"
            class="text-ellipsis overflow-hidden underline"
          >
            Review the project.
          </a>
        </section>
        <section class="pb-5">
          <h4 class="pb-1">JOB DESCRIPTION</h4>
          <p>{{ projectData.jobDescription }}</p>
          <p>{{ projectData.year }}</p>
        </section>
        <section class="pb-5">
          <the-thumbnail
            v-bind="t"
            v-for="t in projectData.technologies"
            :key="t.id"
            class="p-3 inline-block"
          />
        </section>
      </div>
    </article>
  </modal>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 opacity-0 transition-all duration-700 ease-out"
      v-display-when-in-view="0.1"
    >
      <button
        v-for="(item, index) in items"
        :key="item.id"
        :id="item.id"
        :data-index="index"
        @click="selectedProjectId = item.id"
        :class="[
          'flex flex-row group text-primary hover:text-secondary py-5 md:p-5'
        ]"
      >
        <div
          :class="`flex-none w-20 h-20 rounded-50p group-hover:rounded-none shadow-black/80 shadow-inner group-hover:shadow-2xl group-hover:rotate-[360deg] border-primary border-2 group-hover:border-secondary transition-all duration-700 ease-out bg-white bg-cover bg-no-repeat bg-center saturate-150 ${
            [
              'infocyte',
              'cropswap',
              'hopin',
              'joomlaextensions',
              'joomla',
              'careconnect365',
              'acrolinx'
            ].includes(item.id)
              ? 'bg-[length:70%]'
              : ''
          }`"
          v-if="item.backgroundImage"
          :style="{
            'background-image': `url(${item.backgroundImage})`
          }"
        ></div>
        <div class="grow min-w-0 p-1 pl-3">
          <div
            class="title p-2 text-left text-ellipsis overflow-hidden border-b border-r border-dotted border-neutral-light/50 group-hover:border-secondary transition-all duration-500 ease-out"
          >
            {{ item.title }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.box {
  --border-angle: 0turn;
  background-image: conic-gradient(
    from var(--border-angle) at -2% -2%,
    transparent 20%,
    theme('colors.neutral.light'),
    theme('colors.neutral.DEFAULT')
  );
  background-repeat: no-repeat;
  background-position: center center;
  animation: bg-spin 6s linear infinite;
}

@keyframes bg-spin {
  to {
    --border-angle: 1turn;
  }
}

@property --border-angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0turn;
}
</style>
