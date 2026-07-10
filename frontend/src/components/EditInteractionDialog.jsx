import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";

export default function EditInteractionDialog({
  open,
  onClose,
  interaction,
  onSave,
}) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (interaction) {
      setForm({
        hcpName: interaction.hcp_name || "",
        date: interaction.interaction_date || "",
        product: interaction.product || "",
        sentiment: interaction.sentiment || "",
        summary: interaction.summary || "",
        remarks: interaction.remarks || "",
      });
    }
  }, [interaction]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Edit Interaction</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Doctor Name"
              name="hcpName"
              value={form.hcpName || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={form.date || ""}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Product"
              name="product"
              value={form.product || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              label="Sentiment"
              name="sentiment"
              value={form.sentiment || ""}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Positive">Positive</MenuItem>
              <MenuItem value="Neutral">Neutral</MenuItem>
              <MenuItem value="Negative">Negative</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Summary"
              name="summary"
              multiline
              rows={4}
              value={form.summary || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Remarks"
              name="remarks"
              multiline
              rows={3}
              value={form.remarks || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}