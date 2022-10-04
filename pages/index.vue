<template>
    <Head>
        <Title> Peter Vavro = Full-Stack Engineer/Scrum Master </Title>
    </Head>
    <SectionIntro />
    <SectionAboutMe id="about-me" class="py-20" />
    <TheSection
        id="technologies"
        title="My experience"
        class="py-20 text-primary"
        titleClass="lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] -translate-y-24"
    >
        <ListTechnologies />
    </TheSection>
    <TheSection
        id="code-samples"
        title="My code samples"
        class="py-20 text-tertiary"
        titleClass="lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] -translate-y-16"
    >
        <ListCodeSamples />
    </TheSection>
    <TheSection
        id="projects"
        title="Things I've helped to build"
        class="py-20 text-secondary"
        titleClass="lg:text-4xl lg:-rotate-90 lg:-translate-x-[28rem] translate-y-52"
    >
        <ListProjects />
    </TheSection>
</template>
<style>
:target {
    scroll-margin-top: 100px;
}
</style>
