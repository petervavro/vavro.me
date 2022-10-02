<script>
export default {
    computed: {
        getCurrentYear() {
            return new Date().getFullYear()
        }
    }
}
</script>
	
<template>
    <div class="py-10 md:p-20 text-primary text-center md:text-left">
        <div
            class="p-1 rounded-full border-2 border-secondary inline-flex mb-10 items-center"
        >
            <div class="p-3">Contact me</div>
            <PanelContact :is-github-visible="false" />
        </div>
        <div class="md:flex md:flex-row-reverse justify-between items-center">
            <a
                href="#"
                class="p-2 display-block border-2 transform hover:scale-105 transition duration-300 border-secondary hover:text-secondary"
            >
                Back to top
            </a>
            <div class="p-10 py-16 md:p-0">
                All rights reserved © Peter Vavro 2013-{{ getCurrentYear }}
            </div>
        </div>
    </div>
</template>