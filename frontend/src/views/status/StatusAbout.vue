<template>
  <div class="about">
    <h1>À propos</h1>
    <p>InkBrothers - Plateforme de gestion</p>
    <p>Version: {{ version }}</p>
  </div>
</template>

<script setup>
const version = import.meta.env.VITE_APP_VERSION;
</script>

<style scoped>
.about {
  padding: 2rem;
}
</style>
