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
    
<template>
	<ul class="flex flex-row items-center">
		<li class="p-2">
			<a
				href="mailto:peter@vavro.me"
				title="My Email"
				rel="noreferrer"
				class="p-3"
				:class="{ inverted: inverted }"
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
				class="p-2"
				:class="{ inverted: inverted }"
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
				class="p-3"
				:class="{ inverted: inverted }"
			>
				<IconGithub />
				<span class="sr-only"> My GitHub </span>
			</a>
		</li>
	</ul>
</template>

<style scoped>
ul a {
	@apply block border-2 text-primary border-primary hover:text-secondary hover:border-secondary rounded-full transform hover:scale-110 transition duration-300;
}

ul a.inverted {
	@apply block border-2 rounded-full transform hover:scale-110 transition duration-300 text-neutral border-neutral hover:text-neutral hover:border-neutral;
}
</style>
