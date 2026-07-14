// =====================================================
// Shared design tokens — clinical teal / amber palette
// Used by Dashboard, InteractionForm, ChatPanel so the
// whole app reads as one considered visual identity.
// =====================================================

export const tokens = {
  paper: "#F4F7F5",
  card: "#FFFFFF",
  ink: "#16232B",
  inkSoft: "#57686F",
  inkFaint: "#8A9A9E",
  line: "#DCE4E1",

  teal: "#0E7C6B",
  tealDeep: "#0A5C4F",
  tealWash: "#E7F2EE",

  amber: "#DFA23B",
  amberWash: "#FBF1DE",
  amberInk: "#8A5A16",

  panel: "#121B1E",
  panelLine: "#2A3A3E",
  panelSoft: "#9FB0AF",
  panelCanvas: "#1B262A",
  panelBubble: "#1B3A34",
  panelBubbleLine: "#24504A",

  displayFont: "'Fraunces', serif",
  bodyFont: "'Inter', sans-serif",
  monoFont: "'IBM Plex Mono', monospace",
};

// Entity tag colors used for highlighting extracted fields
// inside chat messages (HCP / specialty / location / product / topic / material)
export const entityColors = {
  hcp: { bg: "rgba(223,162,59,0.16)", ink: "#F0C179", label: "#DFA23B" },
  specialty: { bg: "rgba(111,168,160,0.18)", ink: "#A9D0C8", label: "#6FA8A0" },
  location: { bg: "rgba(201,123,99,0.18)", ink: "#E3A692", label: "#C97B63" },
  product: { bg: "rgba(217,187,76,0.18)", ink: "#EBD98A", label: "#D9BB4C" },
  topic: { bg: "rgba(124,147,201,0.18)", ink: "#AEBFE6", label: "#7C93C9" },
  material: { bg: "rgba(164,140,201,0.18)", ink: "#CBB8E8", label: "#A48CC9" },
};
