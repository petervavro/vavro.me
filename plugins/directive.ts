export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('display-when-in-view', {
    mounted(el, binding) {
      const doScroll = () => {
        const { y } = el.getBoundingClientRect()

        const { value = 0.3 } = binding

        el.style.opacity =
          window.innerHeight > y + window.innerHeight * value ? 1 : 0

        if (window.innerHeight > y + window.innerHeight * value)
          window.removeEventListener('scroll', doScroll)
      }

      window.addEventListener('scroll', doScroll)

      doScroll()
    }
  })
})
