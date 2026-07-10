import { Box, Typography } from "@mui/material";

import InteractionForm from "../components/InteractionForm";
import ChatPanel from "../components/ChatPanel";
import InteractionHistory from "../components/InteractionHistory";

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        p: { xs: 2, md: 4 },
        fontFamily: "Inter",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        AI First CRM - HCP Log Interaction
      </Typography>

      {/* Top Section */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1.6fr 1fr",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* Left Side */}
        <InteractionForm />

        {/* Right Side */}
        <Box
          sx={{
            position: {
              xs: "static",
              md: "sticky",
            },
            top: 20,
          }}
        >
          <ChatPanel />
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box mt={4}>
        <InteractionHistory />
      </Box>
    </Box>
  );
}