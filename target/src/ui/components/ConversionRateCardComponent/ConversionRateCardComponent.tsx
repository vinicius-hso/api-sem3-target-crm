import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { useDashboardPage } from '../../../data/services/hooks/PageHooks/DashboardHook';
import { Container } from '@material-ui/core';

function ConversionRateCard(props) {

  const { conversionRateInfo } = useDashboardPage();
  console.log(conversionRateInfo)
    
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
              % {conversionRateInfo['conversionRate']}
            </Typography>

            <Typography
              color="textSecondary"
              variant="body2"
              gutterBottom
            >
                <i className="fa fa-thumbs-o-up"></i> GANHAS: {conversionRateInfo['totalWon']}
            </Typography>
      
            <Typography
              color="textSecondary"
              variant="body2"
              gutterBottom
            >
                <i className="fa fa-thumbs-o-down"></i> PERDIDAS: {conversionRateInfo['totalLost']}
            </Typography>

            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
                <i className="fa fa-cogs"></i> EM ANDAMENTO: {conversionRateInfo['totalInProgress']}
            </Typography>

            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
                <i className="fa fa-archive"></i> ARQUIVADAS: {conversionRateInfo['totalArchived']}
            </Typography>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Container>
  )
};

export default ConversionRateCard;