<template>
    <ul class="flex">
        <li class="px-2 py-2">
        <a href="mailto:<%= mailto %>" title="My Email" rel="noreferrer" class="block text-primary-contrast hover:text-blue-50 border-2 transition p-3 rounded-full transform transition duration-300 hover:scale-125">
            <IconEmail/>
            <span class="sr-only">My Email</span>
        </a>
        </li>
        <li v-if="isGithubVisible" class="px-2 py-2">
        <a href="https://github.com/petervavro" target="_blank" title="My Github" rel="noreferrer" class="block text-primary-contrast hover:text-blue-50 border-2 transition p-3 rounded-full fill-current transform transition duration-300 hover:scale-125">
            <IconGithub />
            <span class="sr-only">My GitHub</span>
        </a>
        </li>
        <li class="px-2 py-2">
        <a href="https://www.linkedin.com/in/peter-vavro-44604163" target="_blank" title="My Linkedin" rel="noreferrer" class="block text-primary-contrast hover:text-blue-50 border-2 transition p-2 rounded-full fill-current transform transition duration-300 hover:scale-125">
            <IconLinkedIn />
            <span class="sr-only">My Linkedin</span>
        </a>
        </li>
    </ul>
</template>
<script>
import IconEmail from "~/assets/icon-Email.svg?inline";
import IconGithub from "~/assets/logo-Github.svg?inline";
import IconLinkedIn from "~/assets/icon-LinkedIn.svg?inline";

export default {
  name: 'PanelContact',
  components: { IconEmail, IconGithub, IconLinkedIn },
  props: {
    isGithubVisible: {
      type: Boolean,
      default: true
    },
  },
}
</script>