<template>
  <div>

    <Head>
      <Title>Peter Vavro = Full-Stack Engineer</Title>
    </Head>
    <SectionIntro class="section" />
    <SectionAboutMe id="about-me" class="section py-20" />
    <TheSection id="technologies" title="Tech Stack" class="section py-20 text-primary"
      titleClass="text-primary lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:-translate-y-36">
      <ListTechnologies />
    </TheSection>
    <TheSection id="code-samples" title="Code Samples" class="section py-20 text-tertiary"
      titleClass="text-primary lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] lg:-translate-y-24">
      <ListCodeSamples />
    </TheSection>
    <TheSection id="projects" title="My Contributions" class="section py-20 text-secondary"
      titleClass="text-primary lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem]">
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
