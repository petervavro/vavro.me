<template>
    <div>
        <button
            id="show-modal"
            @click="showModal = true"
            class="p-2 text-tertiary border-tertiary border-2 transition duration-300 hover:text-secondary hover:border-secondary"
            aria-label="Menu"
        >
            <IconMenu class="w-6 h-6" />
        </button>
        <modal :show="showModal" @close="showModal = false">
            <div class="flex flex-col items-center p-10">
                <div class="pb-5">
                    <ul class="flex flex-col">
                        <li class="px-2 py-2">
                            <a
                                href="#about-me"
                                @click="showModal = false"
                                class="text-xl transition-all duration-300 hover:underline"
                            >
                                About me
                            </a>
                        </li>
                        <li class="px-2 py-2">
                            <a
                                href="#code-samples"
                                @click="showModal = false"
                                class="text-xl transition-all duration-300 hover:underline"
                            >
                                Code
                            </a>
                        </li>
                        <li class="px-2 py-2">
                            <a
                                href="#projects"
                                @click="showModal = false"
                                class="text-xl transition-all duration-300 hover:underline"
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
