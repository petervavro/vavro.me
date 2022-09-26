<template>
	<div class="flex">
		<div class="flex-1 pr-3">
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
					<h4 class="text-lg pb-3">
						{{ selected.title }}
					</h4>
					<div
						class="text-base py-5 border-tertiary border-t border-dotted"
					>
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
						<p class="pt-3">
							{{ selected.note }}
						</p>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>
<script>
import JSON_DATA from 'assets/data/technologies.json'
import { gsap } from 'gsap'

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
			selected: null
		}
	},
	/*
    watch: {
        // whenever question changes, this function will run
        pointer(newV, oldV) {

            const [x, y] = newV

            this.$refs.technology.forEach((t) => {

                // Not optimized yet, I know
                const rect = t.getBoundingClientRect();

                t.style.setProperty("--x", x - rect.left);
                t.style.setProperty("--y", y - rect.top);

            });
        }
    },
    */
	methods: {
		getElementHighPosition(e) {
			console.log(e)
		},
		doSelect(pickedId) {
			this.selected = technologies.find(({ id }) => id === pickedId)
		},
		moveHighlight(e) {
			this.pointer = [e.clientX, e.clientY]
			/*
            console.count()
            console.log();
            const anim = () => {

                let pointX = e.target.style.getPropertyValue('--pointX') || 0;
                let pointY = e.target.style.getPropertyValue('--pointY') || 0;

                pointX += (e.clientX - pointX) * 0.1;
                pointY += (e.clientY - pointY) * 0.1;

                e.target.style.setProperty("--pointX", pointX);
                e.target.style.setProperty("--pointY", pointY);
                console.log(pointX, pointY);
                this.$refs.technology.forEach((t) => {

                    // Not optimized yet, I know
                    const rect = t.getBoundingClientRect();

                    t.style.setProperty("--x", pointX - rect.left);
                    t.style.setProperty("--y", pointY - rect.top);

                });

                if (e.clientX !== pointX) window.requestAnimationFrame(anim);
            }

            anim();
    */

			/*
            const featuresEl = this.$el.querySelector(".wrapper");
            const featureEls = this.$el.querySelectorAll(".technology");
        
            featureEls.forEach((featureEl) => {
        
                // Not optimized yet, I know
                const rect = featureEl.getBoundingClientRect();
        
                featureEl.style.setProperty("--x", ev.clientX - rect.left);
                featureEl.style.setProperty("--y", ev.clientY - rect.top);
            });
            */
		}
	},
	mounted() {
		const tl = gsap.timeline({ repeatDelay: 1, duration: 0.4 })
		// tl.set(".technology", {
		//     className: "technology inactive opacity-0", // "inline-block m-1 p-2 px-5 rounded-full border-2 border-neutral-light text-neutral-light opacity-0"
		// });
		// tl.to(".technology", {
		//     yoyo: true,
		//     stagger: 0.025,
		//     className: "technology inactive", // "technology inline-block m-1 p-2 px-5 rounded-full border-2 border-neutral-light text-neutral-light opacity-100"
		// });
		// tl.to(".technology", {
		//     // opacity: 0.6,
		//     stagger: {
		//         each: 0.1,
		//         // ease: "power4.out",
		//         // amount: 2
		//     }, className: "technology active hover:opacity-100", // "technology inline-block m-1 p-2 px-5 rounded-full border-2 border-secondary text-secondary opacity-60 hover:opacity-100"
		// }, "-=25%");

		// const anim = () => {
		//     console.log('anim', this.pointer);
		//     window.requestAnimationFrame(anim)
		// }

		const anim = () => {
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

			window.requestAnimationFrame(anim)
		}

		anim()

		const loopInterval = setInterval(() => {
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
		}, 3000)
	}
}
</script>
<style scoped lang="css">
*,
*:before,
*:after {
	box-sizing: border-box;
	position: relative;
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