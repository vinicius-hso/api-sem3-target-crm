import { Card, Grid, Typography } from "@material-ui/core";

interface ConversionRateCardProps {
  conversionrate: number;
  totalwon: number;
  totallost: number;
  totalinprogress: number;
  totalarchived: number;
}

const ConversionRateCard: React.FC<ConversionRateCardProps> = (props) => {
  return (
    <Card
      sx={{
        height: "auto",
        width: "auto",
        boxShadow: "0 0 10px 3px rgba(0, 0, 0, .1)",
        padding: "8px",
        margin: "24px",
      }}
      {...props}
    >
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              whiteSpace: "nowrap",
              padding: "24px",
            }}
          >
            <Typography color="primary" gutterBottom variant="h5">
              TAXA DE CONVERSÃO
            </Typography>

            <Typography color="textPrimary" variant="h4" gutterBottom>
              {props.conversionrate} %
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
              <Typography color="textSecondary" variant="body2" gutterBottom>
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
              <Typography color="textSecondary" variant="body2" gutterBottom>
                <i className="fa fa-thumbs-o-down"></i> PERDIDAS
              </Typography>
              <Typography color="textPrimary" variant="h5" gutterBottom>
                {props.totallost}
              </Typography>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "5px",
            }}
          >
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
                sx={{
                  whiteSpace: "nowrap",
                }}
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
                sx={{
                  whiteSpace: "nowrap",
                }}
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
    </Card>
  );
};

export default ConversionRateCard;
