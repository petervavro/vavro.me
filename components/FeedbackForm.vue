<template>
    <div class="flex gap-3">
        <button @click="handleNext"
            class="p-2 transition duration-200 border border-white bg-white/10 hover:bg-white/80 text-white hover:text-neutral">
            Great, next
        </button>
        <button @click="handleLeaveComment"
            class="p-2 transition duration-200 border border-white bg-white/10 hover:bg-white/80 text-white hover:text-neutral">
            Next
        </button>
    </div>
</template>

<script>
export default {
    name: 'FeedbackForm',
    methods: {
        handleNext() {
            this.$emit('next')
        },
        handleLeaveComment() {
            this.$emit('next')
        }
    }
}
</script>