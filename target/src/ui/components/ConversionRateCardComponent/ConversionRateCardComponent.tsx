import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

interface ConversionRateCardProps {
  conversionrate: number;
  totalwon: number;
  totallost: number;
  totalinprogress: number;
  totalarchived: number;
}

const ConversionRateCard: React.FC<ConversionRateCardProps> = (props) => {
  return (
    <Container sx={{ justifyContent: "center", m: 3 }}>
      <Card
        sx={{
          height: "auto",
          backgroundColor: "",
          maxWidth: 300,
          boxShadow: "0 0 10px 3px rgba(0, 0, 0, .1)",
        }}
        {...props}
      >
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography color="primary" gutterBottom variant="h5">
                  TAXA DE CONVERSÃO
                </Typography>

                <Typography color="textPrimary" variant="h4" gutterBottom>
                  % {props.conversionrate}
                </Typography>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    gutterBottom
                  >
                    <i className="fa fa-thumbs-o-up"></i> GANHAS
                  </Typography>
                  <Typography color="textPrimary" variant="h5" gutterBottom>
                    {props.totalwon}
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    gutterBottom
                  >
                    <i className="fa fa-thumbs-o-down"></i> PERDIDAS
                  </Typography>
                  <Typography color="textPrimary" variant="h5" gutterBottom>
                    {props.totallost}
                  </Typography>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    <i className="fa fa-cogs"></i> EM ANDAMENTO
                  </Typography>
                  <Typography color="textPrimary" variant="h5" gutterBottom>
                    {props.totalinprogress}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    <i className="fa fa-archive"></i> ARQUIVADAS
                  </Typography>
                  <Typography color="textPrimary" variant="h5" gutterBottom>
                    {props.totalarchived}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConversionRateCard;
