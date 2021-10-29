import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';
import { useDashboardPage } from '../../../data/services/hooks/PageHooks/DashboardHook';
import { Container } from '@material-ui/core';

function DealsInfoCard(props) {

  const { dealsInfo } = useDashboardPage();
    
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
                NEGOCIAÇÕES
            </Typography>

            <Typography
              color="textSecondary"
              variant="body1"
            >
                VALOR MÉDIO
            </Typography>
            
            <Typography
              color="textPrimary"
              variant="h5"
              gutterBottom
            >
              {dealsInfo.meanValue}
            </Typography>
             
            <Typography
              color="textSecondary"
              variant="body1"
            >
                VALOR TOTAL
            </Typography>
            
            <Typography
              color="textPrimary"
              variant="h5"
              gutterBottom
            >
              {dealsInfo.totalValue}
            </Typography>

            <Typography
              color="textSecondary"
              gutterBottom
              variant="body1"
            >
                TOTAL DE NEGOCIAÇÕES
            </Typography>

            <Typography
              color="textPrimary"
              variant="h5"
            >
              {dealsInfo.totalDeals}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </Container>
  )
};

export default DealsInfoCard;