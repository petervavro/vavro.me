<!-- Please remove this file from your project -->
<template>
  <!-- px-5vw py-9 lg:py-12 -->
  <div class="bg-primary/50 fixed w-full p-5 flex justify-between"> 
    <div class="text-primary-contrast flex">
      <div class="pr-5">
        <NuxtLink to="/"><h1 class="text-2xl font-bold">Peter Vavro</h1></NuxtLink>
        <p class="text-secondary border-t-4 pt-2 mt-2">
          Full-Stack Engineer with preferce for Front-end
        </p>
      </div>
      <div>
        <ul class="flex">
          <li class="px-2 py-2">
            <a href="mailto:<%= mailto %>" title="My Email" rel="noreferrer" class="block text-primary-contrast hover:text-blue-50 border-2 transition p-3 rounded-full transform transition duration-300 hover:scale-125">
              <IconEmail/>
              <span class="sr-only">My Email</span>
            </a>
          </li>
          <li class="px-2 py-2">
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
      </div>
    </div>
    <div>
      <nav class="text-primary-contrast flex">
        <ul class="hidden lg:flex">
          <li class="px-2 py-2">
            <a href="/intro">Intro</a>
          </li>
          <li class="px-2 py-2">
            <a href="/me">About me</a>
          </li>
          <li class="px-2 py-2">
            <a href="/code-samples">Code</a>
          </li>
          <li class="px-2 py-2">
            <a href="/projects">Projects</a>
          </li>
        </ul>
        <button class="pl-5">
          <img src="~assets/icon-menu.svg" />
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import IconEmail from "~/assets/icon-Email.svg?inline";
import IconGithub from "~/assets/logo-Github.svg?inline";
import IconLinkedIn from "~/assets/icon-LinkedIn.svg?inline";

export default {
  name: 'TheHeader',
  components: { IconEmail, IconGithub, IconLinkedIn },
}
</script>
