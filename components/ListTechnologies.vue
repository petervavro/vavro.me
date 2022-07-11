<template>
  <ul>
    <li v-for="key in Object.keys(items)" :key="key" class="flex py-3">
      <div class="px-3 font-bold text-l origin-center -rotate-90">
        {{ key }}
      </div>
      <div class="px-3 border-l-4 border-primary">
        <ul class="flex">
          <li v-for="t in items[key]" :key="t.id" class="p-10">
            <div class="font-bold shadow-2xl">{{ t.title }}</div>
            <a
              :href="t.url"
              class="inline-block border-primary transition duration-300 bg-white rounded-full p-5 mt-5 shadow-xl hover:shadow-2xl opacity-90"
            >
              <img
                v-if="t.thumbnailImage"
                :src="t.thumbnailImage"
                class="h-10 rounded-full"
              />
              <div
                v-if="t.thumbnailImage === undefined"
                class="h-10 inline-block align-middle"
              >
                {{ t.title }}
              </div>
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import JSON_DATA from 'assets/data/technologies.json'

export default {
  name: 'ListTechnologies',
  data() {
    return {
      items: JSON_DATA.reduce(
        (previousValue, currentValue) => ({
          ...previousValue,
          [currentValue.year]: [
            ...(previousValue[currentValue.year] || []),
            {
              ...currentValue,
              thumbnailImage: currentValue?.thumbnailImage
                ? `assets/${currentValue.thumbnailImage}`
                : undefined
            }
          ]
        }),
        {}
      )
    }
  }
}
</script>
