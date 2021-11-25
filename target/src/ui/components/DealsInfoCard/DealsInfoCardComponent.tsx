import { Card, Grid, Typography } from "@material-ui/core";

interface DealsInfoCardProps {
  meanvalue: string;
  totalvalue: string;
  totaldeals: string;
  meandays: string;
}

const DealsInfoCard: React.FC<DealsInfoCardProps> = (props) => {
  return (
    <Card
      sx={{
        height: "auto",
        width: "auto",
        boxShadow: "0 0 10px 3px rgba(0, 0, 0, .1)",
        padding: "24px",
        margin: "24px",
      }}
      {...props}
    >
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="primary" gutterBottom variant="h5">
            NEGOCIAÇÕES
          </Typography>

          <Typography color="textSecondary" variant="body2">
            VALOR MÉDIO
          </Typography>

          <Typography color="textPrimary" variant="h5" gutterBottom>
            {props.meanvalue}
          </Typography>

          <Typography color="textSecondary" variant="body2">
            VALOR TOTAL
          </Typography>

          <Typography color="textPrimary" variant="h5" gutterBottom>
            {props.totalvalue}
          </Typography>

          <Typography color="textSecondary" gutterBottom variant="body2">
            TOTAL DE NEGOCIAÇÕES
          </Typography>

          <Typography color="textPrimary" variant="h5">
            {props.totaldeals}
          </Typography>

          <Typography color="textSecondary" gutterBottom variant="body2">
            TEMPO MÉDIO (dias)
          </Typography>

          <Typography color="textPrimary" variant="h5">
            {typeof props.meandays === "string" ? props.meandays : "0"}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default DealsInfoCard;
