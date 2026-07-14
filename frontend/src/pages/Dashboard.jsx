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
import { tokens } from "../theme/tokens";

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: tokens.paper,
        py: 5,
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 } }}>
        {/* Header */}
        <Box
          sx={{
            background: tokens.card,
            borderRadius: "14px",
            p: 3,
            mb: 4,
            boxShadow:
              "0 1px 2px rgba(22,35,43,0.04), 0 8px 24px -12px rgba(22,35,43,0.12)",
            border: `1px solid ${tokens.line}`,
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
                  fontFamily: tokens.displayFont,
                  fontWeight: 600,
                  fontSize: { xs: "1.8rem", md: "2.15rem" },
                  color: tokens.ink,
                  letterSpacing: "-0.01em",
                }}
              >
                Log HCP interaction
              </Typography>

              <Typography
                sx={{
                  color: tokens.inkSoft,
                  mt: 1,
                  fontSize: "0.95rem",
                }}
              >
                Capture and manage healthcare professional interactions using
                AI.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              <Chip
                icon={
                  <PsychologyIcon
                    sx={{ color: `${tokens.tealDeep} !important` }}
                  />
                }
                label="AI powered"
                sx={{
                  bgcolor: tokens.tealWash,
                  color: tokens.tealDeep,
                  fontWeight: 600,
                  border: `1px solid ${tokens.line}`,
                }}
              />

              <Chip
                icon={
                  <CheckCircleIcon
                    sx={{ color: `${tokens.amberInk} !important` }}
                  />
                }
                label="Ready to save"
                sx={{
                  bgcolor: tokens.amberWash,
                  color: tokens.amberInk,
                  fontWeight: 600,
                  border: "1px solid #EEDBB0",
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Main layout */}
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
          <Box>
            <InteractionForm />
          </Box>

          <Box
            sx={{
              position: { xs: "static", lg: "sticky" },
              top: 24,
            }}
          >
            <ChatPanel />
          </Box>
        </Box>

        <Divider sx={{ my: 5, borderColor: tokens.line }} />

        {/* History */}
        <Box>
          <Typography
            sx={{
              fontFamily: tokens.displayFont,
              fontWeight: 600,
              fontSize: "1.4rem",
              color: tokens.ink,
              mb: 2,
            }}
          >
            Interaction history
          </Typography>

          <InteractionHistory />
        </Box>
      </Container>
    </Box>
  );
}
