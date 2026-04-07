<template>
  <div class="container mx-auto lg:max-w-4xl px-10 py-10">

    <h2 class="pb-5 text-2xl md:text-2xl uppercase text-primary">What Makes Me Different</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <div class="card" v-for="skill in skills" :key="skill.title">
        <span class="card-icon">{{ skill.icon }}</span>
        <h3 class="card-title">{{ skill.title }}</h3>
        <p class="card-body">{{ skill.body }}</p>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
const skills = [
  {
    icon: '🧭',
    title: 'Leadership & Mentoring',
    body: 'Led a team of 4 engineers and mentored junior developers — reviewing code, unblocking problems, and helping them grow.'
  },
  {
    icon: '🤝',
    title: 'Client Communication',
    body: 'Acted as a bridge between clients and the development team — translating business needs into technical decisions and keeping stakeholders informed.'
  },
  {
    icon: '⚖️',
    title: 'Speed & Quality',
    body: 'Balances pragmatism with craftsmanship — ships fast when it matters, takes time to do it right when it counts.'
  },
  {
    icon: '🚀',
    title: 'Autonomous Execution',
    body: 'Owns features end-to-end. Drives technical decisions independently and delivers under tight deadlines without handholding.'
  },
  {
    icon: '🌍',
    title: 'Remote & On-site',
    body: 'Fully comfortable in both remote-first and office environments. Experienced with async collaboration across time zones.'
  },
  {
    icon: '🏢',
    title: 'Startup & Enterprise',
    body: 'Worked across the full spectrum — from fast-moving startups to structured software companies and larger enterprises.'
  },
  {
    icon: '💬',
    title: 'Multilingual',
    body: 'Communicates fluently in English, Slovak, and Spanish — an asset in international and distributed teams.'
  },
]
</script>

<style scoped lang="scss">
.card {
  @apply border border-primary/10 p-5 bg-neutral/40
         hover:border-primary/30 hover:bg-neutral/60 transition-all duration-300;

  .card-icon {
    @apply text-2xl block mb-3;
  }

  .card-title {
    @apply text-sm font-semibold text-tertiary mb-2;
  }

  .card-body {
    @apply text-xs text-neutral-light leading-relaxed;
  }
}
</style>
