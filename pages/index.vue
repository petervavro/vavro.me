<template>
  <div>
    <Head>
      <Title>Peter Vavro = Full-Stack Engineer</Title>
    </Head>
    <SectionIntro class="section" />
    <SectionAboutMe id="about-me" class="section py-20" />
    <TheSection
      id="technologies"
      title="Experience"
      class="section py-20 text-primary"
      titleClass="lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:-translate-y-36"
    >
      <ListTechnologies />
    </TheSection>
    <TheSection
      id="code-samples"
      title="Coding samples"
      class="section py-20 text-tertiary"
      titleClass="lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:-translate-y-16"
    >
      <ListCodeSamples />
    </TheSection>
    <TheSection
      id="projects"
      title="Things I've helped build"
      class="section py-20 text-secondary"
      titleClass="lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:translate-y-[10rem]"
    >
      <ListProjects />
    </TheSection>
    <BackgroundAnimation />
  </div>
</template>
<style>
:target {
  scroll-margin-top: 100px;
}

.section {
  @apply relative z-10;
}
</style>
