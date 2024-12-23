<template>

  <Head>
    <Title>Cover Letter / Peter Vavro = Full-Stack Engineer</Title>
  </Head>
  <div>
    <TheSection title="Cover letter" class="pt-20 text-primary"
      titleClass="text-primary lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:-translate-y-30">
      <div class="p-20 border border-primary mt-20">
        <h1 class="mb-4">Dear Hiring Manager,</h1>
        <div v-for="(part, index) in parts" :key="index" class="paragraph mb-4 relative">
          <div v-if="index === currentStep && index > 0" class="absolute -top-28 left-0">
            <div class="relative p-5">
              <div class="relative z-10">
                <button @click="handleBack"
                  class="p-2 text-sm transition duration-200 border border-primary bg-primary/10 hover:bg-primary/80 text-primary hover:text-neutral">
                  Let's see this again
                </button>
              </div>
              <div class="absolute top-0 bottom-0 right-0 left-0 inset-0 bg-neutral blur-xl" aria-hidden="true" />
            </div>
          </div>
          <p :class="{
            'blur-sm': index !== currentStep,
            'text-white': index === currentStep,
          }">{{ part }}</p>
          <div v-if="index === 1 && index === currentStep" class="flex">
            <the-thumbnail v-for="t in technologies" :key="index" v-bind="t"
              class="pr-5 pb-5 inline-block scale-90 border-secondary pt-10"
              titleClasses="text-primary/90 group-hover:text-secondary text-center" />
          </div>
          <div class="feedback-panel absolute bottom-[-7rem] z-10"
            v-if="index === currentStep && (index + 1 !== parts.length)">
            <div class="relative p-5">
              <div class="relative z-10">
                <div class="flex gap-3">
                  <button @click="handleNext(index, true)"
                    class="p-2 transition duration-200 border border-white bg-white/10 hover:bg-white/80 text-white hover:text-neutral">
                    Great, next
                  </button>
                  <button @click="handleNext(index, false)"
                    class="p-2 transition duration-200 border border-white bg-white/10 hover:bg-white/80 text-white hover:text-neutral">
                    Next
                  </button>
                </div>
              </div>
              <div
                class="absolute top-0 bottom-0 right-0 left-0 inset-0 bg-gradient-to-r from-blue-500/70 to-purple-500/70 opacity-50 blur-xl"
                aria-hidden="true" />
            </div>
          </div>
        </div>
        <p class="mb-4">Thank you for considering my application.</p>
        <p class="mb-4">Sincerely,<br>Ing. Peter Vavro</p>
      </div>
    </TheSection>
    <TheSection class="text-tertiary">
      <div class="px-16">
        <h2 class="text-tertiary lg:text-2xl mb-2">FAQ</h2>
        <ul class="list-square list-inside">
          <li>I tried to tailor this for you; it is dynamically set.</li>
          <li>This cover letter is dynamically adjusted, which is why you received a sophisticated link.</li>
        </ul>
      </div>
    </TheSection>
  </div>
</template>
<style>
:target {
  scroll-margin-top: 100px;
}
</style>
<script setup lang="ts">
const route = useRoute();
const config = ref<ConfigInURL | null>(null);
const error = ref<string | null>(null);
const { decrypt } = useEncryption();

onMounted(async () => {
  const token = route.params.token as string;
  try {
    const { text } = await decrypt(token) || {};
    if (text) config.value = JSON.parse(text)
  } catch (e) {
    error.value = 'Failed to decrypt data';
  }
});

const currentStep = ref(0);

watch(currentStep, (newValue) => {

  const paragraphs = document.querySelectorAll('.paragraph');
  const paragraph = paragraphs[newValue] as HTMLElement;

  scrollToCenter(paragraph);
})

const parts = computed(() => [
  `I am excited to apply for the Senior Full-stack Engineer position at ${config.value?.name || 'your company'}. With over 10 years of experience in full-stack development, I am confident in my ability to contribute your digital transformation initiatives. The opportunity to work with an international and diverse company, particularly on projects that require collaboration across multiple regions and teams, is highly appealing to me.`,
  'In my past role, I have led the design and development web applications, working extensively with modern front-end technologies like React and Angular, as well as back-end technologies such as Node.js and Python. Specifically, these technologies:',
  'Leadership and mentorship are also key strengths I bring to this role. I have successfully guided teams in delivering high-quality software products, fostering a culture of continuous learning and innovation. I’m particularly passionate about encouraging best practices through regular code reviews, technical discussions, and Agile methodologies such as Scrum, ensuring that the team delivers high-impact solutions efficiently and on time.',
  'I am confident that my strong technical background, leadership experience, and passion for continuous improvement make me a great fit for you. I am eager to contribute to your team and help drive forward the innovative solutions you are known for. I look forward to the opportunity to further discuss how my skills and experiences align with the needs of your team.'
])

import TECHNOLOGIES from '~/assets/data/technologies.json'
import type { ConfigInURL, Technology } from '~/types';

const technologies = ref<Technology[]>([]);

watch(config, (newConfig) => {
  if (newConfig) {
    technologies.value = TECHNOLOGIES.filter(({ id }) =>
      (newConfig?.technologies || []).includes(id)
    );
  }
}, { immediate: true });

const handleBack = () => {
  if (currentStep.value > 0) currentStep.value -= 1;
};


const { gtag } = useGtag()

const emit = defineEmits(['next']);

const handleNext = (index: number, like: boolean) => {
  gtag('event', 'cover-letter', {
    partIndex: index,
    like
  })

  if (currentStep.value < parts.value.length) currentStep.value += 1;

};

const scrollToCenter = (targetElement: HTMLElement) => {
  targetElement.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
}
</script>