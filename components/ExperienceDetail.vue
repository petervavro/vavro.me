<script>
import JSON_DATA from 'assets/data/technologies.json'

const technologies = JSON_DATA.filter(({ preferred }) => preferred).sort(
	function (a, b) {
		return a.preferred - b.preferred
	}
)

export default {
	data() {
		return {
			technologies,
			pointer: [0, 0],
			selected: technologies[0],
			loopInterval: null
		}
	},
	methods: {
		doSelect(pickedId) {
			this.selected = technologies.find(({ id }) => id === pickedId)
		},
		switchSelection(event) {
			this.doSelect(event.target.value)

			clearInterval(this.loopInterval)
		},
		moveHighlight(e) {
			this.pointer = [e.clientX, e.clientY]
		}
	},
	mounted() {
		const setPointerCoordinates = () => {
			const [x, y] = this.pointer

			this.$refs.technology.forEach((t) => {
				const currentX = parseInt(t.style.getPropertyValue('--x', 10))
				const currentY = parseInt(t.style.getPropertyValue('--y'), 10)

				const rect = t.getBoundingClientRect()

				let pointX = currentX + rect.left || 0
				let pointY = currentY + rect.top || 0

				const newPointX = Math.ceil(
					pointX + (x - pointX) * 0.3 - rect.left
				)
				const newPointY = Math.ceil(
					pointY + (y - pointY) * 0.3 - rect.top
				)

				if (currentX !== newPointX)
					t.style.setProperty('--x', newPointX)
				if (currentY !== newPointY)
					t.style.setProperty('--y', newPointY)
			})

			window.requestAnimationFrame(setPointerCoordinates)
		}

		setPointerCoordinates()

		const loopInterval = this.loopInterval

		// Select between options loop
		this.loopInterval = setInterval(() => {
			if (
				technologies.every(({ alreadySelected }) => !!alreadySelected)
			) {
				this.selected = technologies.find(({ id }) => id === 'react')

				clearInterval(loopInterval)

				return
			}

			let selected = null

			do {
				selected =
					technologies[
						Math.floor(Math.random() * technologies.length)
					]
			} while (selected?.alreadySelected)

			selected.alreadySelected = true

			this.selected = selected
		}, 4000)
	}
}
</script>
	
<template>
	<select
		class="select md:hidden"
		@change="switchSelection($event)"
		v-model="selected.id"
	>
		<option v-for="(t, index) in technologies" v-bind:value="t.id">
			{{ t.title }}
		</option>
	</select>
	<div class="flex flex-col md:flex-row">
		<div class="flex-1 pr-3 hidden md:block">
			<div @pointermove="moveHighlight">
				<button
					v-for="t in technologies"
					:key="t.id"
					:class="[
						'technology',
						selected === t ? 'selected' : '',
						t?.alreadySelected === true ? 'active' : 'inactive'
					]"
					ref="technology"
					@click="doSelect(t.id)"
				>
					{{ t.title }}
				</button>
			</div>
		</div>
		<div class="flex-1 pl-3 text-secondary">
			<Transition>
				<div v-if="selected !== null">
					<h4
						class="text-lg pb-3 hidden md:block border-tertiary border-b border-dotted"
					>
						{{ selected.title }}
					</h4>
					<div class="text-base py-5">
						<p>
							tasted for first time in <br />
							<span class="text-xl inline-block py-1">
								{{ selected.year }}
							</span>
							<span>
								|&nbsp;{{
									new Date().getFullYear() - selected.year
								}}
								years ago.
							</span>
						</p>
						<p class="pt-3 h-48">
							{{ selected.note }}
						</p>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped>
.select {
	@apply appearance-none bg-no-repeat bg-right w-full p-2 px-5 rounded-full border-2 border-tertiary text-tertiary text-base bg-neutral;
	background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZmlsbDogIzkwY2E3NzsiPjxwYXRoIGQ9Ik0xNDcuNiAyMTAuN2MtNy41IDcuNS03LjUgMTkuOCAwIDI3LjNsOTUuNyA5NS40YzcuMyA3LjMgMTkuMSA3LjUgMjYuNi42bDk0LjMtOTRjMy44LTMuOCA1LjctOC43IDUuNy0xMy43IDAtNC45LTEuOS05LjktNS42LTEzLjYtNy41LTcuNS0xOS43LTcuNi0yNy4zIDBsLTgxIDc5LjgtODEuMS04MS45Yy03LjUtNy41LTE5LjctNy41LTI3LjMuMXoiLz48cGF0aCBkPSJNNDggMjU2YzAgMTE0LjkgOTMuMSAyMDggMjA4IDIwOHMyMDgtOTMuMSAyMDgtMjA4UzM3MC45IDQ4IDI1NiA0OCA0OCAxNDEuMSA0OCAyNTZ6bTMzMi40LTEyNC40QzQxMy43IDE2NC44IDQzMiAyMDkgNDMyIDI1NnMtMTguMyA5MS4yLTUxLjYgMTI0LjRDMzQ3LjIgNDEzLjcgMzAzIDQzMiAyNTYgNDMycy05MS4yLTE4LjMtMTI0LjQtNTEuNkM5OC4zIDM0Ny4yIDgwIDMwMyA4MCAyNTZzMTguMy05MS4yIDUxLjYtMTI0LjRDMTY0LjggOTguMyAyMDkgODAgMjU2IDgwczkxLjIgMTguMyAxMjQuNCA1MS42eiIvPjwvc3ZnPg==);
	/* form-select appearance-none block w-full  text-xl font-normal text-gray-700 bg-neutral bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none */

	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.technology.active {
	@apply border-tertiary text-tertiary opacity-60;
}

.technology.inactive {
	@apply border-neutral-light text-neutral-light;
}

.technology.selected {
	@apply border-secondary text-secondary opacity-100 hover:text-secondary hover:border-secondary;
}

.technology {
	@apply inline-block m-1 p-2 px-5 rounded-full border-2 text-sm transition-all opacity-100 hover:text-tertiary hover:border-tertiary hover:opacity-100;
	--x-px: calc(var(--x) * 1px);
	--y-px: calc(var(--y) * 1px);
	--border: 2px;

	overflow: hidden;
}

.technology:before,
.technology:after {
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	inset: 0px;
	border-radius: inherit;
	background: radial-gradient(
		20rem circle at var(--x-px) var(--y-px),
		rgba(144, 202, 119, 0.3),
		transparent 40%
	);
}

.technology:before {
	z-index: 1;
}

.technology:after {
	z-index: 2;
	opacity: 0;
	transition: opacity 0.4s ease;
}

.technology:hover:after {
	opacity: 1;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>