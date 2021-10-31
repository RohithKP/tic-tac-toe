<template>
  <div class="container mx-auto">
    <header id="header" class="p-5">
      <h1 class="text-5xl mb-10 font-mono font-bold text-green-600">
        Tic.Tac.Toe
      </h1>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
