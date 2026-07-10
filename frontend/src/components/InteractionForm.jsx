import {
  Paper,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import { useSelector } from "react-redux";

export default function InteractionForm() {
  const interaction = useSelector((state) => state.interaction);

  console.log("Redux State:", interaction);

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }} elevation={3}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Interaction Details
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        {/* HCP Name */}
        <TextField
          label="HCP Name"
          value={interaction.hcpName || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Interaction Type */}
        <TextField
          label="Interaction Type"
          value={interaction.interactionType || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Date */}
        <TextField
          label="Date"
          value={interaction.date || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Time */}
        <TextField
          label="Time"
          value={interaction.time || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Attendees */}
        <TextField
          label="Attendees"
          value={interaction.attendees || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Topics Discussed */}
        <TextField
          label="Topics Discussed"
          value={interaction.topicsDiscussed || ""}
          multiline
          rows={2}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Products Discussed */}
        <TextField
          label="Products Discussed"
          value={interaction.productsDiscussed || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Product */}
        <TextField
          label="Primary Product"
          value={interaction.product || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Materials Shared */}
        <TextField
          label="Materials Shared"
          value={interaction.materialsShared || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Brochure */}
        <FormControlLabel
          control={
            <Checkbox
              checked={interaction.brochureShared || false}
              disabled
            />
          }
          label="Brochure Shared"
        />

        {/* Sentiment */}
        <TextField
          label="Sentiment"
          value={interaction.sentiment || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Summary */}
        <TextField
          label="Summary"
          value={interaction.summary || ""}
          multiline
          rows={4}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        {/* Follow-up Required */}
        <FormControlLabel
          control={
            <Checkbox
              checked={interaction.followUpRequired || false}
              disabled
            />
          }
          label="Follow-up Required"
        />

        {/* Follow-up Date */}
        <TextField
          label="Follow-up Date"
          value={interaction.followUpDate || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled
        >
          Save Interaction
        </Button>
      </Stack>
    </Paper>
  );
}