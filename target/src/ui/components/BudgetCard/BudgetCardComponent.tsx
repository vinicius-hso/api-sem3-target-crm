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

function BudgetCard(props) {

  const { dealsInfo } = useDashboardPage();
  console.log(dealsInfo);
    
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
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
                NEGOCIAÇÕES ({dealsInfo.totalDeals})
            </Typography>
            <br/>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
                VALOR MÉDIO
            </Typography>
            
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {dealsInfo.meanValue}
            </Typography>
             <br/>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
                VALOR TOTAL
            </Typography>
            
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {dealsInfo.totalValue}
            </Typography>
            {/* <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
                TOTAL DE NEGOCIAÇÕES
            </Typography>
            
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {dealsMean.totalDeals}
            </Typography> */}
          </Grid>
          <Grid item>
            {/* <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <MoneyIcon />
            </Avatar> */}
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* <ArrowDownwardIcon sx={{ color: red[900] }} />
          <Typography
            sx={{
              color: red[900],
              mr: 1
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography> */}
        </Box>
      </CardContent>
    </Card>
    </Container>
  )
};

export default BudgetCard;