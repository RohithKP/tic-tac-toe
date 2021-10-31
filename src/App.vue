<template>
  <div class="container mx-auto">
    <header class="p-5 header">
      <h1 class="text-5xl font-mono font-bold text-green-600 inline underline">
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
.header {
  text-shadow: -5px 3px 3px #f9cece;
  h1 {
    // border-bottom: 3px double;
  }
}
</style>
