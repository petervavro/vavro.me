<template>
  <div class="bg-primary/50 fixed w-full p-10 px-20 flex justify-between">
    <div class="flex">
      <div class="pr-5">
        <NuxtLink to="/"
          ><h1 class="text-primary-contrast text-2xl">Peter Vavro</h1></NuxtLink
        >
        <p class="text-secondary border-secondary border-t-4 pt-2 mt-2">
          Full-Stack Developer with preference for Front-end
        </p>
      </div>
      <div>
        <PanelContact />
      </div>
    </div>
    <div>
      <MainMenu />
    </div>
  </div>
</template>
