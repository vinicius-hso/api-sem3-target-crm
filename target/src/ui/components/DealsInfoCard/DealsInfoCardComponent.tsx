import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

interface DealsInfoCardProps {
  meanvalue: string,
  totalvalue: string,
  totaldeals: string,
  meandays: string
}

const DealsInfoCard: React.FC<DealsInfoCardProps> = (props) => {

  return (
    <Container sx={{ justifyContent: "center" }}>
      <Card
        sx={{
          height: "100%",
          backgroundColor: "",
          maxWidth: 300,
          boxShadow: "0 0 10px 3px rgba(0, 0, 0, .1)",
        }}
        {...props}
      >
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="primary" gutterBottom variant="h5">
                NEGOCIAÇÕES
              </Typography>

              <Typography color="textSecondary" variant="body1">
                VALOR MÉDIO
              </Typography>

              <Typography color="textPrimary" variant="h5" gutterBottom>
                {props.meanvalue}
              </Typography>

              <Typography color="textSecondary" variant="body1">
                VALOR TOTAL
              </Typography>

              <Typography color="textPrimary" variant="h5" gutterBottom>
                {props.totalvalue}
              </Typography>

              <Typography color="textSecondary" gutterBottom variant="body1">
                TOTAL DE NEGOCIAÇÕES
              </Typography>

              <Typography color="textPrimary" variant="h5">
                {props.totaldeals}
              </Typography>

              <Typography color="textSecondary" gutterBottom variant="body1">
                TEMPO MÉDIO (dias)
              </Typography>

              <Typography color="textPrimary" variant="h5">
                {props.meandays}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default DealsInfoCard;
