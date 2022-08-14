<template>
  <ul>
    <li v-for="key in Object.keys(items)" :key="key" class="flex py-3">
      <div class="px-3 text-l">
        {{ key }}
      </div>
      <div class="px-3 border-l border-dotted border-primary">
        <the-thumbnail v-bind="t" v-for="t in items[key]" :key="t.id" class="p-3 inline-block" />
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
