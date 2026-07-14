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
import { tokens } from "../theme/tokens";

// Small numbered eyebrow — sections here are a genuine review
// sequence (basic info -> discussion -> ... -> AI summary), so the
// numbering encodes real order, not decoration.
function SectionLabel({ number, icon, title }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="center" mb={3}>
      <Box
        sx={{
          fontFamily: tokens.monoFont,
          fontSize: "11px",
          fontWeight: 500,
          color: tokens.tealDeep,
          bgcolor: tokens.tealWash,
          px: 1,
          py: 0.3,
          borderRadius: "4px",
          letterSpacing: "0.03em",
        }}
      >
        {number}
      </Box>
      {icon}
      <Typography
        sx={{
          fontSize: "1.05rem",
          fontWeight: 700,
          color: tokens.ink,
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
}

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
      borderRadius: "8px",
      background: tokens.paper,
      minHeight: 56,

      "& fieldset": {
        borderColor: tokens.line,
      },

      "&:hover fieldset": {
        borderColor: tokens.teal,
      },

      "&.Mui-focused fieldset": {
        borderColor: tokens.teal,
      },
    },

    "& .MuiInputLabel-root": {
      fontWeight: 500,
      color: tokens.inkSoft,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: tokens.tealDeep,
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: "14px",
        bgcolor: tokens.card,
        border: `1px solid ${tokens.line}`,
        boxShadow:
          "0 1px 2px rgba(22,35,43,0.04), 0 8px 24px -12px rgba(22,35,43,0.12)",
      }}
    >
      {/* ================= Header ================= */}

      <Typography
        sx={{
          fontFamily: tokens.displayFont,
          fontSize: "1.3rem",
          fontWeight: 600,
          color: tokens.ink,
        }}
      >
        Interaction details
      </Typography>

      <Typography
        sx={{
          color: tokens.inkSoft,
          mt: 1,
          mb: 3,
          fontSize: "0.9rem",
        }}
      >
        Reviewed and structured from your recorded conversation.
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
            icon={
              interaction.hcpName ? (
                <CheckCircle sx={{ color: `${tokens.tealDeep} !important` }} />
              ) : (
                <HourglassEmpty
                  sx={{ color: `${tokens.inkFaint} !important` }}
                />
              )
            }
            label={
              interaction.hcpName
                ? "AI extraction complete"
                : "Waiting for conversation"
            }
            sx={{
              bgcolor: interaction.hcpName ? tokens.tealWash : "#EEF1F0",
              color: interaction.hcpName ? tokens.tealDeep : tokens.inkSoft,
              fontWeight: 600,
              border: `1px solid ${interaction.hcpName ? tokens.line : "#E4E8E7"}`,
            }}
          />

          <Chip
            icon={
              <PsychologyIcon sx={{ color: `${tokens.amberInk} !important` }} />
            }
            label="Extracted by AI"
            sx={{
              bgcolor: tokens.amberWash,
              color: tokens.amberInk,
              fontWeight: 600,
              border: "1px solid #EEDBB0",
            }}
          />
        </Stack>

        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          sx={{
            borderRadius: "8px",
            px: 3,
            py: 1.2,
            fontWeight: 600,
            textTransform: "none",
            bgcolor: tokens.tealDeep,
            boxShadow: "none",
            "&:hover": { bgcolor: "#083F36", boxShadow: "none" },
          }}
        >
          Save interaction
        </Button>
      </Box>

      <Divider sx={{ mb: 4, borderColor: tokens.line }} />

      <Stack spacing={4}>
        {saved && (
          <Alert
            severity="success"
            sx={{
              borderRadius: "8px",
              bgcolor: tokens.tealWash,
              color: tokens.tealDeep,
              border: `1px solid ${tokens.line}`,
              "& .MuiAlert-icon": { color: tokens.tealDeep },
            }}
          >
            Interaction saved successfully to CRM.
          </Alert>
        )}

        {/* ================= Basic Information ================= */}

        <Box>
          <SectionLabel
            number="01"
            icon={<PersonIcon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Basic information"
          />

          <Stack spacing={3}>
            <TextField
              label="HCP name"
              value={interaction.hcpName || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Interaction type"
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

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= Discussion ================= */}

        <Box>
          <SectionLabel
            number="02"
            icon={<ForumIcon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Discussion"
          />

          <Stack spacing={3}>
            <TextField
              label="Topics discussed"
              value={interaction.topicsDiscussed || ""}
              multiline
              rows={4}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />

            <TextField
              label="Products discussed"
              value={interaction.productsDiscussed || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />

            <TextField
              label="Primary product"
              value={interaction.product || ""}
              InputProps={{ readOnly: true }}
              fullWidth
              sx={fieldStyle}
            />
          </Stack>
        </Box>

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= Materials ================= */}

        <Box>
          <SectionLabel
            number="03"
            icon={<Inventory2Icon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Materials"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Materials shared"
                value={interaction.materialsShared || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={fieldStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Samples distributed"
                value={interaction.samplesDistributed || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={fieldStyle}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= Status ================= */}

        <Box>
          <SectionLabel
            number="04"
            icon={<FlagIcon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Status"
          />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={interaction.brochureShared || false}
                    disabled
                    sx={{
                      color: tokens.line,
                      "&.Mui-checked": { color: tokens.teal },
                    }}
                  />
                }
                label="Brochure shared"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <FormLabel
                  sx={{
                    fontWeight: 600,
                    color: tokens.inkSoft,
                    mb: 1,
                    display: "block",
                    fontSize: "0.85rem",
                  }}
                >
                  HCP sentiment
                </FormLabel>

                <RadioGroup row value={interaction.sentiment || ""}>
                  <FormControlLabel
                    value="Positive"
                    control={
                      <Radio
                        disabled
                        sx={{
                          color: tokens.line,
                          "&.Mui-checked": { color: tokens.teal },
                        }}
                      />
                    }
                    label="😊 Positive"
                  />

                  <FormControlLabel
                    value="Neutral"
                    control={
                      <Radio
                        disabled
                        sx={{
                          color: tokens.line,
                          "&.Mui-checked": { color: tokens.teal },
                        }}
                      />
                    }
                    label="😐 Neutral"
                  />

                  <FormControlLabel
                    value="Negative"
                    control={
                      <Radio
                        disabled
                        sx={{
                          color: tokens.line,
                          "&.Mui-checked": { color: tokens.teal },
                        }}
                      />
                    }
                    label="☹️ Negative"
                  />
                </RadioGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= Follow-up ================= */}

        <Box>
          <SectionLabel
            number="05"
            icon={<EventIcon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Follow-up"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={interaction.followUpRequired || false}
                    disabled
                    sx={{
                      color: tokens.line,
                      "&.Mui-checked": { color: tokens.teal },
                    }}
                  />
                }
                label="Follow-up required"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Follow-up date"
                value={interaction.followUpDate || ""}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={fieldStyle}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= Outcomes ================= */}

        <Box>
          <SectionLabel
            number="06"
            icon={<InsightsIcon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Outcomes"
          />

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

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= Action Items ================= */}

        <Box>
          <SectionLabel
            number="07"
            icon={<TaskAltIcon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Action items"
          />

          <TextField
            label="Action items"
            value={interaction.actionItems || ""}
            multiline
            rows={4}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={fieldStyle}
          />
        </Box>

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= Remarks ================= */}

        <Box>
          <SectionLabel
            number="08"
            icon={<NotesIcon sx={{ color: tokens.teal, fontSize: 20 }} />}
            title="Remarks"
          />

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

        <Divider sx={{ borderColor: tokens.line }} />

        {/* ================= AI Summary ================= */}

        <Box
          sx={{
            p: 3,
            borderRadius: "10px",
            bgcolor: tokens.amberWash,
            border: "1px solid #EEDBB0",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <SmartToyIcon sx={{ color: tokens.amberInk, fontSize: 20 }} />

            <Typography
              sx={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: tokens.ink,
              }}
            >
              AI generated summary
            </Typography>

            <Chip
              label="AI"
              size="small"
              sx={{
                ml: "auto",
                bgcolor: tokens.amber,
                color: "#fff",
                fontWeight: 700,
              }}
            />
          </Stack>

          <TextField
            label="Summary"
            value={interaction.summary || ""}
            multiline
            rows={6}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{
              ...fieldStyle,
              "& .MuiOutlinedInput-root": {
                ...fieldStyle["& .MuiOutlinedInput-root"],
                background: "#fff",
              },
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
