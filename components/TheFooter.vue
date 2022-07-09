<template>
  <div class="p-20 text-primary-contrast">
    <div class="rounded-full border-2 border-secondary p-2 inline-flex mb-10 items-center">
      <div>
        <h6 class="p-3">Contact me</h6>
      </div>
      <div>
        <PanelContact :is-github-visible="false" />
      </div>
    </div>
    <div class="flex justify-between">
      <div>All rights reserved © Peter Vavro 2013-{{ new Date().getFullYear() }}</div>
      <div>
        <a
          href="#"
          class="border-2 border-secondary p-3"
        >Back to top</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>
