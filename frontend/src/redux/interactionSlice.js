import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // ==========================
  // Basic Information
  // ==========================
  hcpName: "",
  interactionType: "",
  date: "",
  time: "",
  attendees: "",

  // ==========================
  // Discussion
  // ==========================
  topicsDiscussed: "",
  productsDiscussed: "",
  product: "",

  // ==========================
  // Materials
  // ==========================
  materialsShared: "",
  samplesDistributed: "",

  // ==========================
  // Status
  // ==========================
  sentiment: "",
  brochureShared: false,

  // ==========================
  // Follow-up
  // ==========================
  followUpRequired: false,
  followUpDate: "",

  // ==========================
  // Outcomes
  // ==========================
  outcomes: "",

  // ==========================
  // Action Items
  // ==========================
  actionItems: "",

  // ==========================
  // Remarks
  // ==========================
  remarks: "",

  // ==========================
  // AI Summary
  // ==========================
  summary: "",
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

export const { updateInteraction, resetInteraction } = interactionSlice.actions;

export default interactionSlice.reducer;
