import api from "./api";

export const sendChat = async (
  message,
  interactionId = null
) => {

  const response = await api.post("/chat", {
    message,
    interaction_id: interactionId,
  });

  return response.data;
};