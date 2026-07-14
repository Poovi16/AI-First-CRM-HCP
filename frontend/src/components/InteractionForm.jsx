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

import { CheckCircle, HourglassEmpty, Save } from "@mui/icons-material";

import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FlagIcon from "@mui/icons-material/Flag";
import EventIcon from "@mui/icons-material/Event";
import InsightsIcon from "@mui/icons-material/Insights";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NotesIcon from "@mui/icons-material/Notes";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PsychologyIcon from "@mui/icons-material/Psychology";

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
      minHeight: 60,

      "& fieldset": {
        borderColor: "#D9E2EC",
      },

      "&:hover fieldset": {
        borderColor: "#2563EB",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2563EB",
      },
    },

    "& .MuiInputLabel-root": {
      fontWeight: 500,
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "24px",
        bgcolor: "#fff",
        border: "1px solid #E2E8F0",
        boxShadow: "0 12px 40px rgba(15,23,42,.10)",
      }}
    >
      {/* ================= Header ================= */}

      <Typography
        sx={{
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "#0F172A",
        }}
      >
        Interaction Details
      </Typography>

      <Typography
        sx={{
          color: "#64748B",
          mt: 1,
          mb: 3,
        }}
      >
        AI extracted information from your conversation.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            icon={interaction.hcpName ? <CheckCircle /> : <HourglassEmpty />}
            label={
              interaction.hcpName
                ? "AI Extraction Complete"
                : "Waiting for Conversation"
            }
            color={interaction.hcpName ? "success" : "default"}
          />

          <Chip
            icon={<PsychologyIcon />}
            label="AI Confidence 96%"
            color="primary"
            variant="outlined"
          />
        </Stack>

        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          sx={{
            borderRadius: "14px",
            px: 3,
            py: 1.2,
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 8px 20px rgba(37,99,235,.25)",
          }}
        >
          Save Interaction
        </Button>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={4}>
        {saved && (
          <Alert
            severity="success"
            sx={{
              borderRadius: "12px",
            }}
          >
            Interaction saved successfully to CRM.
          </Alert>
        )}

        {/* ================= Basic Information ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <PersonIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Basic Information
            </Typography>
          </Stack>

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

        {/* ================= Discussion ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <ForumIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Discussion
            </Typography>
          </Stack>

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

        {/* ================= Materials ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <Inventory2Icon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Materials
            </Typography>
          </Stack>

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

        {/* ================= Status ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <FlagIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Status
            </Typography>
          </Stack>

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
                    label="☹️ Negative"
                  />
                </RadioGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* ================= Follow-up ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <EventIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Follow-up
            </Typography>
          </Stack>

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

        {/* ================= Outcomes ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <InsightsIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Outcomes
            </Typography>
          </Stack>

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

        {/* ================= Action Items ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <TaskAltIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Action Items
            </Typography>
          </Stack>

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

        {/* ================= Remarks ================= */}

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <NotesIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              Remarks
            </Typography>
          </Stack>

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

        {/* ================= AI Summary ================= */}

        <Box
          sx={{
            p: 3,
            borderRadius: "20px",
            bgcolor: "#F8FAFF",
            border: "1px solid #DBEAFE",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <SmartToyIcon color="primary" />

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#0F172A",
              }}
            >
              AI Generated Summary
            </Typography>

            <Chip label="AI" color="primary" size="small" sx={{ ml: "auto" }} />
          </Stack>

          <TextField
            label="Summary"
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
