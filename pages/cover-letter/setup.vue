<script setup lang="ts">
import technologies from '~/assets/data/technologies.json'
import type { Technology } from '~/types';

const companyName = ref('');
const positionType = ref('front-end');
const positionName = ref('Senior Full-stack Engineer');
const selectedTechnologies = ref<Technology["id"][]>(["typescript", "nodejs", "react", "vuejs"])
const { encryptAndRedirect } = useEncryption();

const configData = computed(() => ({
    ...companyName.value && { name: companyName.value },
    isFrontEndPosition: positionType.value === 'front-end',
    ...positionName.value && { positionName: positionName.value },
    technologies: selectedTechnologies.value
}))
</script>
<template>

    <Head>
        <Title>Cover Letter Configurator</Title>
    </Head>
    <TheSection>
        <section>
            <div class="pt-40 flex gap-5 justify-between w-full">
                <div class="w-full">
                    <label for="companyName" class="block pb-1 text-primary-light">Company name</label>
                    <input name="companyName" v-model="companyName" type="text" />
                </div>
                <div class="w-full">
                    <div>

                        <label for="positionName" class="block pb-1 text-primary-light">Position name</label>
                        <input name="positionName" v-model="positionName" type="text" />
                    </div>
                    <div class="pt-5 pl-2 flex gap-5">
                        <div>
                            <input type="radio" id="front-end" value="front-end" v-model="positionType" />
                            <label for="front-end" class="pl-2">front-end</label>
                        </div>
                        <div>
                            <input type="radio" id="full-stack" value="full-stack" v-model="positionType" />
                            <label for="full-stack" class="pl-2">full-stack</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-5">
                <label for="technologies" class="block pb-1 text-primary-light">Technologies</label>
                <input name="technologies" type="text" placeholder="Enter technologies separated by commas"
                    :value="selectedTechnologies"
                    @input="event => selectedTechnologies = event?.target && (event.target as HTMLInputElement).value.split(',') || []" />
            </div>
            <div class="grid grid-cols-4 gap-4 p-5 pt-20">
                <div v-for="(t, index) in technologies" :key="index">
                    <div class="flex gap-3">
                        <input type="checkbox" :value="t.id" v-model="selectedTechnologies" />
                        <the-thumbnail v-bind="t"
                            class="inline-block text-neutral-light md:group-hover:scale-105 antialiased" />
                    </div>
                </div>
            </div>
        </section>
        <div class="flex pt-5 justify-end w-full">
            <button @click="encryptAndRedirect(configData, (t) => `/cover-letter/${t}`)">
                Show cover letter
            </button>
        </div>
    </TheSection>
</template>
<style scoped lang="scss">
label {
    @apply text-primary-light;
}

input[type="text"] {
    @apply w-full p-2 text-sm border border-primary bg-primary/10 text-primary;
}

input[type="checkbox"] {
    @apply h-4 w-4 text-primary border-primary focus:ring-primary bg-transparent;
}

button {
    @apply p-2 text-sm transition duration-200 border border-primary bg-primary/10 hover:bg-primary/80 text-primary hover:text-neutral;
}
</style>