<template>
    <div class="divide-y-2 divide-solid">
        <section v-for="item in items" :key="item.title" class="py-10">
            <h3 class="text-xl pb-3">{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <ul class="flex">
                <li v-for="t in item.technologies" :key="t.id" class="p-3">
                    <div class="font-bold text-center">{{ t.title }}</div>
                    <a :href="t.url"
                        class="inline-block border-primary transition duration-300 bg-white rounded-full p-5 mt-5 shadow-xl hover:shadow-2xl opacity-90">
                        <img v-if="t.thumbnailImage" :src="t.thumbnailImage" class="h-10 rounded-full" />
                        <div v-if="t.thumbnailImage === undefined" class="h-10 inline-block align-middle">
                            {{ t.title }}
                        </div>
                    </a>
                </li>
            </ul>
            <a :href="item.url"
                class="inline-block border-2 border-primary rounded-full transform p-3 text-primary text-sm">
                Link to the code
            </a>
        </section>
    </div>
</template>

<script>
import TECHNOLOGIES from 'assets/data/technologies.json'
import JSON_DATA from 'assets/data/codes.json'

export default {
    name: 'ListCodeSamples',
    data() {
        return {
            items: JSON_DATA.map(({ technologies, ...rest }) => ({
                ...rest,
                technologies: TECHNOLOGIES.filter(
                    ({ id }) => technologies.split(",").includes(id)
                ).map((t) => ({
                    ...t,
                    thumbnailImage: t?.thumbnailImage
                        ? `assets/${t.thumbnailImage}`
                        : undefined
                }))
            }))
        }
    }
}
</script>
