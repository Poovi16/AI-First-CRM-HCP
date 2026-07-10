import api from "./api";

export const sendChat = async (message) => {
  const response = await api.post("/chat", {
    message,
  });

  return response.data;
};