import api from "./api";

console.log("API Base URL:", api.defaults.baseURL);

export const sendChat = async (message, interactionId = null) => {
  const response = await api.post("/chat", {
    message,
    interaction_id: interactionId,
  });

  return response.data;
};