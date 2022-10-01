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
	>
		<ListTechnologies />
	</TheSection>
	<TheSection
		id="code-samples"
		title="My code samples"
		class="py-20 text-tertiary"
	>
		<ListCodeSamples />
	</TheSection>
	<TheSection
		id="projects"
		title="Things I've helped to build"
		class="py-20 text-secondary"
	>
		<ListProjects />
	</TheSection>
</template>
<style>
:target {
	scroll-margin-top: 100px;
}
</style>
