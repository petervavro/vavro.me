<script lang="ts" setup>
const showModal = ref(false)
</script>

<template>
  <div>
    <button id="show-modal" @click="showModal = true"
      class="p-2 text-tertiary border-tertiary border-2 transition duration-200 hover:text-secondary hover:border-secondary hover:scale-110"
      aria-label="Menu">
      <SvgoIconMenu class="text-xl !mb-0" />
    </button>
    <modal :show="showModal" @close="showModal = false" modalContentClass="bg-secondary pt-10">
      <div class="flex flex-col items-center p-10">
        <div class="pb-5">
          <ul class="flex flex-col">
            <li class="px-2 py-3">
              <a href="#about-me" @click="showModal = false" class="menu-link">
                About me
              </a>
            </li>
            <li class="px-2 py-3">
              <a href="#code-samples" @click="showModal = false" class="menu-link">
                Code
              </a>
            </li>
            <li class="px-2 py-3">
              <a href="#projects" @click="showModal = false" class="menu-link">
                Projects
              </a>
            </li>
          </ul>
        </div>
        <div class="pb-5">
          <PanelContact :inverted="true" />
        </div>
      </div>
    </modal>
  </div>
</template>
<style lang="scss">
.menu-link {
  @apply text-xl transition-all duration-300 hover:underline;
}
</style>
