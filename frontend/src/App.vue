<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">À propos</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Logique du composant si nécessaire
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 1rem;
  background-color: #2c3e50;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
}

nav a:hover {
  background-color: #42b983;
  border-radius: 4px;
}

nav a.router-link-active {
  background-color: #42b983;
  border-radius: 4px;
}

main {
  padding: 2rem;
}
</style>
