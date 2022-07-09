<template>
  <div class="bg-primary/50 fixed w-full p-5 flex justify-between"> 
    <div class="text-primary-contrast flex">
      <div class="pr-5">
        <NuxtLink to="/"><h1 class="text-2xl">Peter Vavro</h1></NuxtLink>
        <p class="text-secondary border-secondary border-t-4 pt-2 mt-2">
          Full-Stack Engineer with preferce for Front-end
        </p>
      </div>
      <div>
        <PanelContact />
      </div>
    </div>
    <div>
      <nav class="text-primary-contrast flex">
        <!-- 
        <ul class="hidden lg:flex">
          <li class="px-2 py-2">
            <a href="/intro">Intro</a>
          </li>
          <li class="px-2 py-2">
            <a href="/me">About me</a>
          </li>
          <li class="px-2 py-2">
            <a href="/code-samples">Code</a>
          </li>
          <li class="px-2 py-2">
            <a href="/projects">Projects</a>
          </li>
        </ul>
        -->
        <!-- <button class="pl-5">
          <img src="~assets/icon-menu.svg" />
        </button> -->
      </nav>
    </div>
  </div>
</template>