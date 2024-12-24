import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger);
  }
  nuxtApp.vueApp.use(gsap);
  return {
    provide: {
      gsap: gsap,
    },
  };
});
