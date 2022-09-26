<template>
	<div class="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4">
		<section
			v-for="item in items"
			:key="item.title"
			class="p-5 border-dotted border-t border-primary"
		>
			<h3 class="text-xl pb-3">{{ item.title }}</h3>
			<p>{{ item.desc }}</p>
			<a
				:href="item.url"
				class="inline-block border-2 border-primary rounded-full transform p-3 text-primary text-sm mt-3"
				target="_blank"
			>
				Link to the code
			</a>
			<div class="pt-3">
				<the-thumbnail
					v-bind="t"
					v-for="t in item.technologies"
					:key="t.id"
					class="p-3 inline-block"
				/>
			</div>
		</section>
	</div>
</template>

<script>
import TECHNOLOGIES from 'assets/data/technologies.json'
import JSON_DATA from 'assets/data/codes.json'

export default {
	name: 'ListCodeSamples',
	data() {
		return {
			items: JSON_DATA.map(({ technologies, ...rest }) => ({
				...rest,
				technologies: TECHNOLOGIES.filter(({ id }) =>
					technologies.split(',').includes(id)
				).map((t) => ({
					...t,
					thumbnailImage: t?.thumbnailImage
						? `assets/${t.thumbnailImage}`
						: undefined
				}))
			}))
		}
	}
}
</script>
