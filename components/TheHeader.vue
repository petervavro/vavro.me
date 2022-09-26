<template>
    <div
        class="bg-neutral/50 fixed w-full p-5 lg:p-10 flex justify-between items-center z-10"
    >
        <div class="flex">
            <div>
                <NuxtLink to="/">
                    <h1 class="text-primary text-2xl uppercase">Peter Vavro</h1>
                </NuxtLink>
                <p
                    class="hidden lg:block text-secondary border-secondary border-t-4 pt-2 mt-2"
                >
                    Full-Stack Developer with preference for Front-end
                </p>
            </div>
            <div class="hidden lg:block">
                <PanelContact class="pl-5" />
            </div>
        </div>
        <div>
            <MainMenu />
        </div>
    </div>
</template>
