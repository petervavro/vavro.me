<template>
	<div>
		<button
			id="show-modal"
			@click="showModal = true"
			class="p-3 text-tertiary border-tertiary hover:text-secondary hover:border-secondary border-2"
			aria-label="Menu"
		>
			<IconMenu class="w-6 h-6" />
		</button>
		<Teleport to="body">
			<modal :show="showModal" @close="showModal = false">
				<div class="flex flex-col items-center p-10">
					<div class="pb-5">
						<ul class="flex flex-col">
							<li class="px-2 py-2">
								<a
									href="#about-me"
									@click="showModal = false"
									class="text-xl transition-all duration-300"
								>
									About me
								</a>
							</li>
							<li class="px-2 py-2">
								<a
									href="#code-samples"
									@click="showModal = false"
									class="text-xl transition-all duration-300"
								>
									Code
								</a>
							</li>
							<li class="px-2 py-2">
								<a
									href="#projects"
									@click="showModal = false"
									class="text-xl transition-all duration-300"
								>
									Projects
								</a>
							</li>
						</ul>
					</div>
					<div class="pb-5">
						<PanelContact inverted="true" />
					</div>
				</div>
			</modal>
		</Teleport>
	</div>
</template>
<script lang="ts">
import IconMenu from '~/assets/icon-menu.svg'

export default {
	components: { IconMenu },
	data() {
		return {
			showModal: false
		}
	}
}
</script>
