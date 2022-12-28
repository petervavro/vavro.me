export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('display-when-in-view', {
    mounted(el, binding) {
      const doScroll = () => {
        const { y, height } = el.getBoundingClientRect()

        const { value = 0.3 } = binding

        el.style.opacity =
          window.innerHeight > y + window.innerHeight * value ? 1 : 0

        if (y + height < 0) window.removeEventListener('scroll', doScroll)
      }

      window.addEventListener('scroll', doScroll)

      doScroll()
    }
  })
})
