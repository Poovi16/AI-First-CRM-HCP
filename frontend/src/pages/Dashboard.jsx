import { Box, Typography, Container } from "@mui/material";

import InteractionForm from "../components/InteractionForm";
import ChatPanel from "../components/ChatPanel";
import InteractionHistory from "../components/InteractionHistory";

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F6F8FC",
        py: 5,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 } }}>
        {/* Header */}
        <Box mb={2}>
          <Typography
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              fontWeight: 600,
              color: "#1E293B",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}
          >
            Log HCP Interaction
          </Typography>

          <Typography
            sx={{
              fontSize: "0.95rem",
              color: "#64748B",
              lineHeight: 1.5,
            }}
          >
            <br></br>
          </Typography>
        </Box>

        {/* Main Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr",
              lg: "1fr 420px",
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
                lg: "sticky",
              },
              top: 24,
            }}
          >
            <ChatPanel />
          </Box>
        </Box>

        {/* Interaction History */}
        <Box mt={5}>
          <InteractionHistory />
        </Box>
      </Container>
    </Box>
  );
}
