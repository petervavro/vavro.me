import { useElementVisibility } from '@vueuse/core'

export const useIsInViewport = () => {
  const target = ref(null)
  const targetIsVisible = useElementVisibility(target)

  return { target, isVisible: targetIsVisible }
}
