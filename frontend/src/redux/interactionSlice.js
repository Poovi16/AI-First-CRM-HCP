import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // HCP Details
  hcpName: "",

  // Interaction Details
  interactionType: "",
  date: "",
  time: "",
  attendees: "",

  // Discussion Details
  topicsDiscussed: "",
  productsDiscussed: "",
  product: "",
  materialsShared: "",

  // AI Analysis
  sentiment: "",
  summary: "",

  // Materials
  brochureShared: false,

  // Follow-up
  followUpRequired: false,
  followUpDate: "",

  // Extra Fields (Future Use)
  actionItems: "",
  nextSteps: "",
  remarks: "",
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    updateInteraction: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    resetInteraction: () => initialState,
  },
});

export const {
  updateInteraction,
  resetInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;