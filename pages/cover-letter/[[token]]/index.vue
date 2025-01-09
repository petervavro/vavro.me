<script setup lang="ts">
const route = useRoute();
const { decrypt } = useEncryption();

const token = route.params.token as string;

const { data, error, status } = await decrypt(token)

const config = computed(() => data.value && JSON.parse(data.value))

const currentStep = ref(0);

watch(currentStep, (newValue) => {

  const paragraphs = document.querySelectorAll('.paragraph');
  const paragraph = paragraphs[newValue] as HTMLElement;

  scrollToCenter(paragraph);
})

const parts = computed(() => [
  [
    `The opportunity to contribute to your team ${config.value?.positionName ? `as a ${config.value?.positionName}` : ''} is highly compelling.`,
    // `I am excited to apply for the ${config.value?.positionName || 'Senior Full-stack Engineer'} position at ${config.value?.name || 'your company'}.`,
    `With over 20 years of experience in ${config.value?.isFrontEndPosition ? 'software development with a strong focus on front-end technologies' : 'full-stack development'}, I am confident that my skills and background make me an excellent fit for this role.`,
    ...config.value?.isInternational ? `The opportunity to work with an international and diverse company, particularly on projects that require collaboration across multiple regions and teams, is highly appealing to me.` : [],
  ].join(" "),
  [
    `My professional journey has been deeply rooted in creating scalable, secure, and reliable code for public-facing applications.`,
    `Previous roles included responsibilities such as developing and maintaining complex front-end systems, ensuring high-quality user experiences for thousands of users.`,
    ...config.value?.isFrontEndPosition ? [
      `I have a keen eye for detail and a deep understanding of UX principles, which has consistently allowed me to exceed user expectations.`
    ] : [],
    `My experience encompasses a strong foundation in the following technologies:`,
  ].join(" "),
  [
    `Leadership and mentorship have been significant aspects of my career.`,
    `I have guided teams to deliver high-quality software products while fostering a culture of continuous learning and innovation.`,
    `Through close collaboration with cross-functional teams, including product managers and designers, I have consistently taken features from conception to production.`,
    `By encouraging best practices through regular code reviews, technical discussions, and Agile methodologies such as Scrum, I ensure that high-impact solutions are delivered efficiently and on time.`,
  ].join(" "),
  [
    `This combination of a strong technical background, leadership experience, and a passion for continuous improvement positions me to make a valuable contribution to your team.`,
    `Supporting ${config.value?.name || 'your company'}’s innovative solutions is an exciting prospect.`,
  ].join(" "),
  [
    `Thank you for considering my application.`,
    `I look forward to the opportunity to further discuss how my skills and experiences align with the needs of your team.`
  ].join(" ")
])

import TECHNOLOGIES from '~/assets/data/technologies.json'
import type { Technology } from '~/types';

const technologies = ref<Technology[]>([]);

watch(config, (newConfig) => {
  if (newConfig) {
    technologies.value = newConfig?.technologies.map((tId: string) =>
      TECHNOLOGIES.find(({ id }) => id === tId)
    ).filter(Boolean) as Technology[];
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
<template>

  <Head>
    <Title>Cover Letter / Peter Vavro = Full-Stack Engineer</Title>
  </Head>
  <div class="pt-20 text-primary">
    <TheSection title="Cover letter"
      titleClass="text-primary lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:-translate-y-24" contentClass="">
      <Transition>
        <p v-if="error === 'FAILED_TO_DECRYPT_TOKEN'" class="text-red-400 px-3 pb-10">
          Oops! :( It seems there’s an issue loading your personalized content. This could be due to an incomplete or
          incorrect link. Please double-check that you’ve copied the entire URL, including the token,
          correctly. In the meantime, you can view a general cover letter below. Apologies for the inconvenience!
        </p>
      </Transition>
      <div class="p-5 lg:p-20 border border-primary/40" v-if="status !== 'pending'">
        <h1 class="mb-4">Dear Hiring Manager,</h1>
        <div v-for="(part, index) in parts" :key="index" class="paragraph mb-4 relative" :class="{
          'focused': index === currentStep
        }">
          <Transition>
            <div v-if="index === currentStep && index > 0" class="absolute -top-28 left-0">
              <div class="relative p-5">
                <div class="relative z-10">
                  <button @click="handleBack"
                    class="p-2 text-sm transition duration-200 border border-primary/20 bg-primary/10 hover:bg-primary/80 text-primary hover:text-neutral">
                    Let's see this again
                  </button>
                </div>
                <div class="absolute top-0 bottom-0 right-0 left-0 inset-0 bg-neutral blur-xl" aria-hidden="true" />
              </div>
            </div>
          </Transition>
          <p @click="currentStep = index">{{ part }}</p>
          <div v-if="index === 1 && index === currentStep" class="py-5 flex w-fit flex-wrap gap-1">
            <the-thumbnail v-for="t in technologies" :key="index" v-bind="t"
              class="p-3 inline-block scale-90 border-secondary"
              titleClasses="text-primary/90 group-hover:text-secondary text-center"
              thumbnailClasses="shadow-in border-primary" />
          </div>
          <Transition>
            <div class="feedback-panel absolute bottom-[-7rem] z-10"
              v-if="index === currentStep && (index + 1 !== parts.length)">
              <div class="relative p-5">
                <div class="relative z-10">
                  <div class="flex gap-3">
                    <button @click="handleNext(index, true)" class="btn">
                      ✔&nbsp;So far so good, next
                    </button>
                    <button @click="handleNext(index, false)" class="btn">
                      ✗&nbsp;Next
                    </button>
                  </div>
                </div>
                <div
                  class="absolute top-0 bottom-0 right-0 left-0 inset-0 bg-gradient-to-r from-blue-500/70 to-purple-500/70 opacity-50 blur-xl"
                  aria-hidden="true" />
              </div>
            </div>
          </Transition>
        </div>
        <p class="mb-4">Sincerely,<br>Ing. Peter Vavro</p>
        <div class="mt-10 flex">
          <NuxtLink to="/" class="btn text-sm">☛ My online portfolio is available here ☚</NuxtLink>
        </div>
      </div>
    </TheSection>
  </div>
</template>
<style scoped lang="scss">
.btn {
  @apply p-2 transition duration-200 border border-white/20 bg-white/10 hover:bg-white/20 text-white
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(3.5rem);
  opacity: 0;
}

.paragraph {
  p {
    @apply blur-sm
  }

  &.focused {
    p {
      @apply blur-none text-white
    }
  }
}

.no-js {
  .feedback-panel {
    @apply opacity-0;
  }

  .paragraph {
    p {
      @apply blur-none
    }

    &.focused {
      p {
        @apply blur-none text-inherit
      }
    }
  }
}
</style>