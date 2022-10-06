<script>
import TECHNOLOGIES from 'assets/data/technologies.json'
import JSON_DATA from 'assets/data/codes.json'
import gsap from 'gsap'

export default {
	data() {
		return {
			isVisible: false,
			items: JSON_DATA.map(({ technologies, ...rest }) => ({
				...rest,
				technologies: TECHNOLOGIES.filter(({ id }) =>
					technologies.split(',').includes(id)
				).map((item) => ({
					...item,
					...(item?.thumbnailImage && {
						thumbnailImage: new URL(
							`../assets/${item.thumbnailImage}`,
							import.meta.url
						).href
					})
				}))
			}))
		}
	},
	mounted() {
		this.isVisible = true
	},
	methods: {
		onBeforeEnter(el) {
			el.style.opacity = 0
		},
		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				delay: el.dataset.index * 0.3,
				onComplete: done
			})
		},
		onLeave(el, done) {
			gsap.to(el, {
				opacity: 0,
				onComplete: done
			})
		}
	}
}
</script>

<template>
	<TransitionGroup
		tag="div"
		class="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4"
		:css="false"
		@before-enter="onBeforeEnter"
		@enter="onEnter"
		@leave="onLeave"
	>
		<a
			:href="item.url"
			target="_blank"
			v-for="(item, index) in items"
			class="p-3 py-5 border-dotted border-t border-primary hover:border-secondary hover:text-secondary lg:hover:-translate-y-1 transition-all duration-300 ease-out"
			:key="item.title"
			:data-index="index"
			v-if="isVisible"
		>
			<h3 class="h-16 text-xl pb-3">
				{{ item.title }}
			</h3>
			<p class="md:h-44">
				{{ item.desc }}
			</p>
			<div class="pt-3">
				<the-thumbnail
					v-bind="t"
					v-for="t in item.technologies"
					:key="t.id"
					class="p-3 inline-block"
				/>
			</div>
		</a>
	</TransitionGroup>
</template>