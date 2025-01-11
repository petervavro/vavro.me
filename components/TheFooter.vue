<script>
export default {
  computed: {
    getCurrentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<template>
  <footer>
    <div class="container mx-auto lg:max-w-4xl">
      <div class="flex md:flex-row-reverse p-10 text-primary">
        <div class="md:basis-5/6 md:border-neutral-light md:border-l md:p-10">
          <p class="pb-10 text-secondary leading-relaxed">
            Please feel free to contact me, and let us begin a discussion on how I can assist
            you in achieving your objectives. I look forward to hearing from you soon.
          </p>
          <div class="p-1 rounded-full border-2 border-secondary inline-flex items-center">
            <div class="p-3 px-5">Contact me</div>
            <PanelContact :is-github-visible="false" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col-reverse md:flex-row items-end md:items-center justify-between p-10 py-20 md:py-10">
      <div class="text-xs md:text-base text-neutral-light">
        All rights reserved © Peter Vavro 2013-{{ getCurrentYear }}
      </div>
      <div class="pb-10 md:pb-0">
        <a href="#"
          class="p-2 inline-block border-2 transform hover:scale-105 transition duration-300 text-tertiary hover:text-secondary border-tertiary hover:border-secondary">
          Back to top
        </a>
      </div>
    </div>
  </footer>
</template>
