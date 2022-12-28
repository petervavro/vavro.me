export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('display-when-in-view', {
    mounted(el, binding) {
      el.style.opacity = 0

      const doScroll = () => {
        const { y, height } = el.getBoundingClientRect()

        const { value = 0.3 } = binding

        if (window.innerHeight > y + window.innerHeight * value)
          el.style.opacity = 1

        if (y + height < 0) window.removeEventListener('scroll', doScroll)
      }

      window.addEventListener('scroll', doScroll)
    }
  })
})
