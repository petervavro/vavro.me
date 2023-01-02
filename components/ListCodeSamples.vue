<script setup>
import TECHNOLOGIES from 'assets/data/technologies.json'
import JSON_DATA from 'assets/data/codes.json'

const items = JSON_DATA.map(({ technologies, ...rest }) => ({
  ...rest,
  technologies: TECHNOLOGIES.filter(({ id }) =>
    technologies.split(',').includes(id)
  )
}))
</script>

<template>
  <div class="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-3 group">
    <a
      :href="item.url"
      target="_blank"
      v-for="(item, index) in items"
      class="hover:shadow-lg shadow-black/10 p-5 border-neutral-light/50 border-t border-l hover:border-dotted hover:border-secondary hover:text-secondary transition-all duration-500 ease-out"
      :key="item.title"
      :data-index="index"
      v-display-when-in-view
    >
      <h3 class="h-16 text-xl pb-3">
        {{ item.title }}
      </h3>
      <p class="pb-3">{{ item.desc }}&nbsp;🔗</p>
      <the-thumbnail
        v-bind="t"
        v-for="t in item.technologies"
        :key="t.id"
        class="pr-2 pb-2 inline-block scale-90 border-secondary"
      />
    </a>
  </div>
</template>
