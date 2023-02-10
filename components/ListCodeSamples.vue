<script setup>
import TECHNOLOGIES from '~/assets/data/technologies.json'
import JSON_DATA from '~/assets/data/codes.json'

import IconLink from '~/assets/link.svg'

const items = JSON_DATA.map(({ technologies, ...rest }) => ({
  ...rest,
  technologies: TECHNOLOGIES.filter(({ id }) =>
    technologies.split(',').includes(id)
  )
}))
</script>

<template>
  <div class="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-3">
    <a
      :href="item.url"
      target="_blank"
      v-for="(item, index) in items"
      class="group hover:shadow-lg shadow-black/10 p-5 border-neutral-light/50 border-t border-l transition-all duration-300 ease-out hover:text-secondary"
      :key="item.title"
      :data-index="index"
      v-display-when-in-view
    >
      <div class="w-full pb-5">
        <IconLink class="w-8 h-8 fill-neutral-light" />
      </div>
      <h3 class="h-16 text-xl pb-3">
        {{ item.title }}
      </h3>
      <p class="pb-10">{{ item.desc }}</p>
      <div class="flex flex-wrap">
        <the-thumbnail
          v-bind="t"
          v-for="t in item.technologies"
          :key="t.id"
          class="pr-5 pb-5 inline-block scale-90 border-secondary"
          titleClasses="text-primary/90 group-hover:text-secondary text-center"
        />
      </div>
    </a>
  </div>
</template>
