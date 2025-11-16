<script setup>
import { ref } from "vue";
import apiClient from "@/utils/axios";

const appName = import.meta.env.VITE_APP_NAME;
const apiStatus = ref(null);

const checkAPI = async () => {
  try {
    const response = await apiClient.get("/health");
    apiStatus.value = response.data;
  } catch (error) {
    apiStatus.value = {
      status: "ERROR",
      message: error.message,
    };
  }
};
</script>
<template>
  <div class="home">
    <h1>{{ appName }}</h1>
    <p>Bienvenue sur InkBrothers</p>

    <div class="api-status">
      <h2>État de l'API</h2>
      <button @click="checkAPI">Vérifier l'API</button>
      <div v-if="apiStatus" :class="['status', apiStatus.status]">
        <p>Status: {{ apiStatus.status }}</p>
        <p>Message: {{ apiStatus.message }}</p>
        <p v-if="apiStatus.timestamp">Timestamp: {{ apiStatus.timestamp }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
}

.api-status {
  margin-block-start: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.status {
  margin-block-start: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

.status.OK {
  background-color: #d4edda;
  color: #155724;
}

.status.ERROR {
  background-color: #f8d7da;
  color: #721c24;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369970;
}
</style>
