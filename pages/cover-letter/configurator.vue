<script setup lang="ts">
import technologies from '~/assets/data/technologies.json'
import type { Technology } from '~/types';

const companyName = ref('');
const positionType = ref('front-end');
const positionName = ref('Senior Full-stack Engineer');
const selectedTechnologies = ref<Technology["id"][]>(["typescript", "nodejs", "react", "vuejs"])
const { encrypt } = useEncryption();

const token = ref<string | undefined>('');

watchEffect(async () => {
    token.value = await encrypt({
        ...companyName.value && { name: companyName.value },
        isFrontEndPosition: positionType.value === 'front-end',
        ...positionName.value && { positionName: positionName.value },
        technologies: selectedTechnologies.value
    });
});
</script>
<template>

    <Head>
        <Title>Cover Letter Configurator</Title>
    </Head>
    <TheSection title="Cover letter configurator" class="pt-16"
        titleClass="text-primary lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:translate-y-44"
        contentClass="pl-5 md:pl-10 border-l border-primary border-dotted flex flex-col gap-5">
        <section>
            <div class="flex gap-5 justify-between w-full">
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
        <section>
            <h2 class="block pb-1 text-primary-light pb-5">Invitation to dynamic Cover Letter</h2>
            <div class="bg-white p-10">
                <h3>Hello!</h3>
                <br />
                <p>I take a slightly different approach to presenting myself. Rather than providing a traditional static
                    document, I invite you to explore my cover letter on my portfolio website. There, you’ll find a more
                    dynamic
                    and interactive presentation of my professional story, including my projects, achievements, and
                    skills.
                </p>
                <br />
                <p class="break-all">🔗 <b>I've crafted this cover letter specifically for your company:</b>&nbsp;
                    <NuxtLink :to="`/cover-letter/${token}`" target="_blank" class="underline">
                        https://vavro.me/cover-letter/{{ token }}
                    </NuxtLink>
                </p>
                <br />
                <p>Feel free to browse through my portfolio for additional insights into my work. I greatly appreciate
                    your
                    time and collaboration in this process and hope this approach offers a refreshing and engaging
                    perspective.
                    If you have any questions or need further information, don’t hesitate to reach out.
                </p>
                <br />
                <p>
                    Looking forward to connecting!
                </p>
                <br />
                <p>Warm regards,<br />
                    Ing. Peter Vavro<br />
                    peter@vavro.me
                </p>
            </div>
        </section>
        <div class="flex pt-5 justify-end w-full">
            <NuxtLink :to="`/cover-letter/${token}`" class="btn">
                Go to cover letter
            </NuxtLink>
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

button,
.btn {
    @apply p-2 text-sm transition duration-200 border border-primary bg-primary/10 hover:bg-primary/80 text-primary hover:text-neutral;
}
</style>