import { useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Stack,
  Divider,
  Grid,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Box,
  Button,
  Chip,
  Alert,
} from "@mui/material";

import {
  CheckCircle,
  HourglassEmpty,
  Save,
} from "@mui/icons-material";

import { useSelector } from "react-redux";

export default function InteractionForm() {

  const interaction = useSelector((state) => state.interaction);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      background: "#fff",

      "& fieldset": {
        borderColor: "#D9E2EC",
      },

      "&:hover fieldset": {
        borderColor: "#2563eb",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
      },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "24px",
        background: "#fff",
        boxShadow: "0 10px 35px rgba(15,23,42,.08)",
      }}
    >
      {/* Header */}

      <Typography
        sx={{
          fontSize: "1.15rem",
          fontWeight: 600,
          color: "#1E293B",
        }}
      >
        Interaction Details
      </Typography>

      <Typography
  sx={{
    color: "#64748B",
    mt: 0.5,
    mb: 3,
    fontSize: "0.9rem",
  }}
>
  AI extracted information from your conversation.
</Typography>

<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  }}
>
  <Chip
    icon={
      interaction.hcpName ? (
        <CheckCircle />
      ) : (
        <HourglassEmpty />
      )
    }
    label={
      interaction.hcpName
        ? "AI Extracted Successfully"
        : "Waiting for conversation"
    }
    color={interaction.hcpName ? "success" : "default"}
  />

  <Button
    variant="contained"
    startIcon={<Save />}
    onClick={handleSave}
    sx={{
      borderRadius: "12px",
      textTransform: "none",
      fontWeight: 600,
    }}
  >
    Save Interaction
  </Button>
</Box>

<Divider sx={{ mb: 4 }} />

      <Stack spacing={4}>

        {saved && (
          <Alert severity="success" sx={{ borderRadius: "12px" }}>
            ✓ Interaction Saved Successfully
          </Alert>
        )}
        {/* ==========================================
            Section 1 - Basic Information
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Basic Information
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="HCP Name"
              value={interaction.hcpName || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Interaction Type"
                  value={interaction.interactionType || ""}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Date"
                  value={interaction.date || ""}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Time"
                  value={interaction.time || ""}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  sx={fieldStyle}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Attendees"
                  value={interaction.attendees || ""}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  sx={fieldStyle}
                />
              </Grid>
            </Grid>
          </Stack>
        </Box>

        <Divider />

        {/* ==========================================
            Section 2 - Discussion
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Discussion
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Topics Discussed"
              value={interaction.topicsDiscussed || ""}
              multiline
              rows={4}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />

            <TextField
              label="Products Discussed"
              value={interaction.productsDiscussed || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />

            <TextField
              label="Primary Product"
              value={interaction.product || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />
          </Stack>
        </Box>

        <Divider />

        {/* ==========================================
            Section 3 - Materials
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Materials
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Materials Shared"
                value={interaction.materialsShared || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={fieldStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Samples Distributed"
                value={interaction.samplesDistributed || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={fieldStyle}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* ==========================================
            Section 4 - Status
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Status
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={interaction.brochureShared || false}
                    disabled
                  />
                }
                label="Brochure Shared"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <FormLabel
                  sx={{
                    fontWeight: 600,
                    color: "#475569",
                    mb: 1,
                    display: "block",
                  }}
                >
                  HCP Sentiment
                </FormLabel>

                <RadioGroup row value={interaction.sentiment || ""}>
                  <FormControlLabel
                    value="Positive"
                    control={<Radio disabled />}
                    label="😊 Positive"
                  />

                  <FormControlLabel
                    value="Neutral"
                    control={<Radio disabled />}
                    label="😐 Neutral"
                  />

                  <FormControlLabel
                    value="Negative"
                    control={<Radio disabled />}
                    label="☹ Negative"
                  />
                </RadioGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* ==========================================
            Section 5 - Follow-up
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Follow-up
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={interaction.followUpRequired || false}
                    disabled
                  />
                }
                label="Follow-up Required"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Follow-up Date"
                value={interaction.followUpDate || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={fieldStyle}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* ==========================================
            Section 6 - Outcomes
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Outcomes
          </Typography>

          <TextField
            label="Outcomes"
            value={interaction.outcomes || ""}
            multiline
            rows={4}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={fieldStyle}
          />
        </Box>

        <Divider />

        {/* ==========================================
            Section 7 - Action Items
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Action Items
          </Typography>

          <TextField
            label="Action Items"
            value={interaction.actionItems || ""}
            multiline
            rows={4}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={fieldStyle}
          />
        </Box>

        <Divider />

        {/* ==========================================
            Section 8 - Remarks
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            Remarks
          </Typography>

          <TextField
            label="Remarks"
            value={interaction.remarks || ""}
            multiline
            rows={4}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={fieldStyle}
          />
        </Box>

        <Divider />

        {/* ==========================================
            Section 9 - AI Summary
        =========================================== */}

        <Box>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              mb: 3,
              color: "#0F172A",
            }}
          >
            AI Summary
          </Typography>

          <TextField
            label="AI Generated Summary"
            value={interaction.summary || ""}
            multiline
            rows={6}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={fieldStyle}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
