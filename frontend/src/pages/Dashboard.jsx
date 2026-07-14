import {
  Box,
  Typography,
  Container,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PsychologyIcon from "@mui/icons-material/Psychology";

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
        {/* Enterprise Header */}
        <Box
          sx={{
            background: "#fff",
            borderRadius: 4,
            p: 3,
            mb: 4,
            boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
            border: "1px solid #E2E8F0",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1.8rem",
                    md: "2.2rem",
                  },
                  fontWeight: 700,
                  color: "#1E293B",
                  letterSpacing: "-0.02em",
                }}
              >
                Log HCP Interaction
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  mt: 1,
                }}
              >
                Capture and manage healthcare professional interactions using
                AI.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              <Chip
                icon={<PsychologyIcon />}
                label="AI Powered"
                sx={{
                  bgcolor: "#DBEAFE",
                  color: "#1D4ED8",
                  fontWeight: 600,
                }}
              />

              <Chip
                icon={<CheckCircleIcon />}
                label="Ready to Save"
                color="success"
                variant="filled"
              />
            </Stack>
          </Stack>
        </Box>

        {/* Main Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1fr 420px",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              borderRadius: 4,
            }}
          >
            <InteractionForm />
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              position: {
                xs: "static",
                lg: "sticky",
              },
              top: 24,
              borderRadius: 4,
            }}
          >
            <ChatPanel />
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* History */}
        <Box>
          <Typography variant="h5" fontWeight={700} mb={2} color="#1E293B">
            Interaction History
          </Typography>

          <InteractionHistory />
        </Box>
      </Container>
    </Box>
  );
}
