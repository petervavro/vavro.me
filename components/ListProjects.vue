<script>
import TECHNOLOGIES from 'assets/data/technologies.json'
import JSON_DATA from 'assets/data/projects.json'
import gsap from 'gsap'

export default {
	data() {
		return {
			isVisible: false,
			selectedProjectId: false,
			items: JSON_DATA.map((item) => ({
				...item,
				thumbnailImage: item?.thumbnailImage
					? `assets/${item.thumbnailImage}`
					: undefined
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
				delay: el.dataset.index * 0.15,
				onComplete: done
			})
		},
		onLeave(el, done) {
			gsap.to(el, {
				opacity: 0,
				onComplete: done
			})
		}
	},
	watch: {
		selectedProjectId(newValue) {
			if (newValue !== false) {
				document.body.classList.add('overflow-hidden')
			} else {
				document.body.classList.remove('overflow-hidden')
			}
		}
	},
	computed: {
		projectData() {
			const project = this.items.find(
				({ id }) => id === this.selectedProjectId
			)
			return {
				...project,
				technologies: TECHNOLOGIES.filter(({ id }) =>
					project.technologies.split(',').includes(id)
				).map((t) => ({
					...t,
					thumbnailImage: t?.thumbnailImage
						? `assets/${t.thumbnailImage}`
						: undefined
				}))
			}
		}
	}
}
</script>

<template>
	<modal :show="selectedProjectId" @close="selectedProjectId = false">
		<article class="container mx-auto max-w-4xl p-10 pt-5">
			<div class="bg-tertiary -xl p-10">
				<h3 class="text-2xl pb-3">{{ projectData.title }}</h3>
				<section class="pb-5">
					<h4>PROJECT DESCRIPTION</h4>
					<p class="pb-1">{{ projectData.description }}</p>
					<a
						:href="projectData.url"
						target="_blank"
						class="text-ellipsis overflow-hidden underline"
					>
						View project.
					</a>
				</section>
				<section class="pb-5">
					<h4>JOB DESCRIPTION</h4>
					<p>{{ projectData.jobDescription }}</p>
					<p>{{ projectData.year }}</p>
				</section>
				<section class="pb-5">
					<the-thumbnail
						v-bind="t"
						v-for="t in projectData.technologies"
						:key="t.id"
						class="p-3 inline-block"
					/>
				</section>
			</div>
		</article>
	</modal>
	<div>
		<TransitionGroup
			tag="div"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
			:css="false"
			@before-enter="onBeforeEnter"
			@enter="onEnter"
			@leave="onLeave"
		>
			<button
				v-for="(item, index) in items"
				:key="item.id"
				:id="item.id"
				:data-index="index"
				@click="selectedProjectId = item.id"
				class="flex flex-row group text-primary hover:text-secondary transition-all duration-300 ease-out"
				v-if="isVisible"
			>
				<div
					:class="`flex-none mt-3 w-20 h-20 border-2 rounded-50p group-hover:rounded-none group-hover:rotate-[360deg] border-tertiary group-hover:border-secondary transition-all duration-500 ease-out bg-white bg-cover bg-no-repeat bg-center ${
						[
							'infocyte',
							'cropswap',
							'hopin',
							'joomlaextensions',
							'joomla',
							'careconnect365'
						].includes(item.id)
							? 'bg-[length:70%]'
							: ''
					}`"
					v-if="item.thumbnailImage"
					:style="{
						'background-image': `url(${item.thumbnailImage})`
					}"
				></div>
				<div class="grow min-w-0">
					<div
						class="text-ellipsis overflow-hidden border-b border-dotted border-tertiary group-hover:border-secondary p-3 text-left"
					>
						{{ item.title }}
					</div>
				</div>
			</button>
		</TransitionGroup>
	</div>
</template>
