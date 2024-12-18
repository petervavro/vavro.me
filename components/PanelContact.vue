<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    inverted: {
      type: Boolean,
      default: false
    },
    isGithubVisible: {
      type: Boolean,
      default: true
    }
  }
});
</script>

<template>
  <ul class="flex flex-row items-center">
    <li class="p-2">
      <a
        href="mailto:peter@vavro.me"
        title="My Email"
        rel="noreferrer"
        class="p-3"
        :class="{ inverted: inverted }"
      >
        <SvgoIconEmail class="text-3xl !mb-0" />
        <span class="sr-only"> My Email </span>
      </a>
    </li>
    <li class="p-2">
      <a
        href="https://www.linkedin.com/in/peter-vavro-44604163"
        target="_blank"
        title="My Linkedin"
        rel="noreferrer"
        class="p-[0.5rem]"
        :class="{ inverted: inverted }"
      >
        <SvgoIconLinkedIn class="text-4xl !mb-0"/>
        <span class="sr-only"> My Linkedin </span>
      </a>
    </li>
    <li v-if="isGithubVisible" class="p-2">
      <a
        href="https://github.com/petervavro"
        target="_blank"
        title="My Github"
        rel="noreferrer"
        class="p-3"
        :class="{ inverted: inverted }"
      >
        <SvgoIconGithub  class="text-3xl !mb-0"/>
        <span class="sr-only"> My GitHub </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
ul a {
  @apply block border-2 text-primary border-primary hover:text-secondary hover:border-secondary rounded-full transform hover:scale-105 transition duration-200;
}

ul a.inverted {
  @apply text-neutral border-neutral hover:text-neutral hover:border-neutral;
}
</style>
