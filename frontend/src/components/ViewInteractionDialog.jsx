import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Divider,
} from "@mui/material";

export default function ViewInteractionDialog({
  open,
  onClose,
  interaction,
}) {
  if (!interaction) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Interaction Details
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">
              HCP Name
            </Typography>
            <Typography>
              {interaction.hcp_name || interaction.hcpName || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">
              Interaction Type
            </Typography>
            <Typography>
              {interaction.interaction_type || interaction.interactionType || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">
              Date
            </Typography>
            <Typography>
              {interaction.interaction_date || interaction.date || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">
              Time
            </Typography>
            <Typography>
              {interaction.interaction_time || interaction.time || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Attendees
            </Typography>
            <Typography>
              {interaction.attendees || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Topics Discussed
            </Typography>
            <Typography>
              {interaction.topics_discussed ||
                interaction.topicsDiscussed ||
                "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Products Discussed
            </Typography>
            <Typography>
              {interaction.products_discussed ||
                interaction.productsDiscussed ||
                "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Primary Product
            </Typography>
            <Typography>
              {interaction.product || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Materials Shared
            </Typography>
            <Typography>
              {interaction.materials_shared ||
                interaction.materialsShared ||
                "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">
              Sentiment
            </Typography>
            <Typography>
              {interaction.sentiment || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">
              Brochure Shared
            </Typography>
            <Typography>
              {interaction.brochure_shared ||
              interaction.brochureShared
                ? "Yes"
                : "No"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Summary
            </Typography>
            <Typography>
              {interaction.summary || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Follow-up Required
            </Typography>
            <Typography>
              {interaction.follow_up_required ||
              interaction.followUpRequired
                ? "Yes"
                : "No"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Follow-up Date
            </Typography>
            <Typography>
              {interaction.follow_up_date ||
                interaction.followUpDate ||
                "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Action Items
            </Typography>
            <Typography>
              {interaction.action_items ||
                interaction.actionItems ||
                "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Next Steps
            </Typography>
            <Typography>
              {interaction.next_steps ||
                interaction.nextSteps ||
                "-"}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Remarks
            </Typography>
            <Typography>
              {interaction.remarks || "-"}
            </Typography>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}