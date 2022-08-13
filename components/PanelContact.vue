<template>
  <ul class="flex flex-row items-center">
    <li class="px-2 py-2">
      <a href="mailto:<%= mailto %>" title="My Email" rel="noreferrer"
        class="block border-2 rounded-full transform hover:scale-125 transition duration-300 p-3" :class="[
          inverted
            ? 'text-primary border-primary hover:text-blue-50:border-blue-50'
            : 'text-primary-contrast border-primary-contrast hover:text-blue-50:border-blue-50'
        ]">
        <IconEmail />
        <span class="sr-only">My Email</span>
      </a>
    </li>
    <li v-if="isGithubVisible" class="px-2 py-2">
      <a href="https://github.com/petervavro" target="_blank" title="My Github" rel="noreferrer"
        class="block border-2 rounded-full transform hover:scale-125 transition duration-300 p-3" :class="[
          inverted
            ? 'text-primary border-primary hover:text-blue-50:border-blue-50'
            : 'text-primary-contrast border-primary-contrast hover:text-blue-50:border-blue-50'
        ]">
        <IconGithub />
        <span class="sr-only">My GitHub</span>
      </a>
    </li>
    <li class="px-2 py-2">
      <a href="https://www.linkedin.com/in/peter-vavro-44604163" target="_blank" title="My Linkedin" rel="noreferrer"
        class="block border-2 rounded-full transform hover:scale-125 transition duration-300 p-2" :class="[
          inverted
            ? 'text-primary border-primary hover:text-blue-50:border-blue-50'
            : 'text-primary-contrast border-primary-contrast hover:text-blue-50:border-blue-50'
        ]">
        <IconLinkedIn />
        <span class="sr-only">My Linkedin</span>
      </a>
    </li>
  </ul>
</template>
<script>
import IconEmail from '~/assets/icon-Email.svg'
import IconGithub from '~/assets/logo-Github.svg'
import IconLinkedIn from '~/assets/icon-LinkedIn.svg'

export default {
  components: { IconEmail, IconGithub, IconLinkedIn },
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
}
</script>
