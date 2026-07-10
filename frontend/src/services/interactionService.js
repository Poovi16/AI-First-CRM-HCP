import api from "./api";

export const getInteractions = async () => {
  const res = await api.get("/interactions");
  return res.data;
};

export const getInteraction = async (id) => {
  const res = await api.get(`/interaction/${id}`);
  return res.data;
};

export const updateInteraction = async (id, data) => {
  const res = await api.put(`/interaction/${id}`, data);
  return res.data;
};

export const deleteInteraction = async (id) => {
  const res = await api.delete(`/interaction/${id}`);
  return res.data;
};