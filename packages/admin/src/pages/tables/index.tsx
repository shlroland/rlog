import PageTitle from 'src/components/PageTitle'
import {
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

// data
import mock from '../dashboard/mock'
import type { FC } from 'react'
import Widget from 'src/layouts/Widget'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  tableOverflow: {
    overflow: 'auto',
  },
}))

const Tables: FC = () => {
  const classes = useStyles()

  const keys = Object.keys(mock.table[0]).map((i) => i.toUpperCase())
  keys.shift() // delete "id" key
  return (
    <>
      <PageTitle title="Tables" />
      <Grid item xs={12}>
        <Widget title="Material-UI Table" noBodyPadding bodyClass={classes.tableOverflow}>
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                {keys.map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {mock.table.map(
                ({ id, name, email, product, price, date, city, status }) => (
                  <TableRow key={id}>
                    <TableCell className="pl-3 fw-normal">{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{product}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>{city}</TableCell>
                    <TableCell>
                      <Chip label={status} />
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </Widget>
      </Grid>
    </>
  )
}

export default Tables
