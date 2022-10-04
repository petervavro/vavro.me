import { useElementVisibility } from '@vueuse/core'

export const useIsInViewport = () => {
    const isDisplayed = ref(false)
    const target = ref(null)
    const targetIsVisible = useElementVisibility(target)

    const isVisible = computed(() => {
        // Make sure it will run the animation just once
        const result = isDisplayed.value || targetIsVisible.value

        if (result === true) isDisplayed.value = true

        return result
    })

    return {target, isVisible}
  }