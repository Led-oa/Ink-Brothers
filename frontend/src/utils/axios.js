import axios from "axios";

// Déterminer l'URL de base selon l'environnement
const getBaseURL = () => {
  // En production (build), utiliser l'URL relative pour passer par Nginx
  if (import.meta.env.PROD) {
    return "/api";
  }
  // En développement, utiliser la variable d'environnement ou localhost:3000
  return import.meta.env.VITE_API_URL || "http://localhost:3000/api";
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Intercepteur de requête
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("📤 Requête:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Erreur requête:", error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse
apiClient.interceptors.response.use(
  (response) => {
    console.log("📥 Réponse:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ Erreur réponse:", error.response?.status, error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
