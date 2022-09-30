<template>
	<ul class="flex flex-row items-center">
		<li class="p-2">
			<a
				href="mailto:<%= mailto %> "
				title="My Email"
				rel="noreferrer"
				class="block p-3 border-2 rounded-full transform hover:scale-110 transition duration-300"
				:class="[
					inverted
						? 'text-neutral border-neutral hover:text-blue-50:border-blue-50'
						: 'text-primary border-primary hover:text-blue-50:border-blue-50'
				]"
			>
				<IconEmail />
				<span class="sr-only"> My Email </span>
			</a>
		</li>
		<li class="p-2">
			<a
				href="https://www.linkedin.com/in/peter-vavro-44604163"
				target="_blank"
				title="My Linkedin"
				rel="noreferrer"
				class="block p-2 border-2 rounded-full transform hover:scale-110 transition duration-300"
				:class="[
					inverted
						? 'text-neutral border-neutral hover:text-blue-50:border-blue-50'
						: 'text-primary border-primary hover:text-blue-50:border-blue-50'
				]"
			>
				<IconLinkedIn />
				<span class="sr-only"> My Linkedin </span>
			</a>
		</li>
		<li v-if="isGithubVisible" class="p-2">
			<a
				href="https://github.com/petervavro"
				target="_blank"
				title="My Github"
				rel="noreferrer"
				class="block p-3 border-2 rounded-full transform hover:scale-110 transition duration-300"
				:class="[
					inverted
						? 'text-neutral border-neutral hover:text-blue-50:border-blue-50'
						: 'text-primary border-primary hover:text-blue-50:border-blue-50'
				]"
			>
				<IconGithub />
				<span class="sr-only"> My GitHub </span>
			</a>
		</li>
	</ul>
</template>
<script>
import IconEmail from '~/assets/icon-Email.svg'
import IconGithub from '~/assets/logo-Github.svg'
import IconLinkedIn from '~/assets/icon-LinkedIn.svg'

export default {
	components: { IconEmail, IconGithub, IconLinkedIn },
	props: {
		inverted: {
			type: Boolean,
			default: false
		},
		isGithubVisible: {
			type: Boolean,
			default: true
		}
	}
}
</script>
