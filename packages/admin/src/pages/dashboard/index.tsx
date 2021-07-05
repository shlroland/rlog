import type { FC } from 'react'
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
} from '@material-ui/core'
import PageTitle from 'src/components/PageTitle'

const Dashboard: FC = () => {
  return (
    <>
      <PageTitle
        title="Dashboard"
        button={
          <Button variant="contained" size="medium" color="secondary">
            Latest Reports
          </Button>
        }
      />
      {/* <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}></Grid>
      </Grid> */}
    </>
  )
}

export default Dashboard
