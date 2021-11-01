import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography
} from '@material-ui/core';

interface ConversionRateCardProps {
  conversionrate: number,
  totalwon: number,
  totallost: number,
  totalinprogress: number,
  totalarchived: number,
}

const ConversionRateCard: React.FC<ConversionRateCardProps> = (props) => {
    
  return (
    <Container sx={{ justifyContent: 'center'}}>
        <Card
      sx={{ height: '100%', backgroundColor: '', maxWidth: 300, boxShadow: '0 0 10px 3px rgba(0, 0, 0, .1)' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>

            <Typography
              color="primary"
              gutterBottom
              variant="h5"
            >
                TAXA DE CONVERSÃO 
            </Typography>

            <Typography
              color="textPrimary"
              variant="h4"
              gutterBottom
            >
              % {props.conversionrate}
            </Typography>

            <Typography
              color="textSecondary"
              variant="body2"
              gutterBottom
            >
                <i className="fa fa-thumbs-o-up"></i> GANHAS: {props.totalwon}
            </Typography>
      
            <Typography
              color="textSecondary"
              variant="body2"
              gutterBottom
            >
                <i className="fa fa-thumbs-o-down"></i> PERDIDAS: {props.totallost}
            </Typography>

            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
                <i className="fa fa-cogs"></i> EM ANDAMENTO: {props.totalinprogress}
            </Typography>

            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
                <i className="fa fa-archive"></i> ARQUIVADAS: {props.totalarchived}
            </Typography>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Container>
  )
};

export default ConversionRateCard;