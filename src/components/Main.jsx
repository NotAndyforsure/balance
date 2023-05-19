import React, {useContext} from "react"
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from "@mui/material"
import {Forms} from "./Forms"
import {Records} from "./Records"
import {ExpenseTrackerContext} from "../context/context"
import {InfoCard} from "./InfoCard"

export const Main = () => {
  const {balance} = useContext(ExpenseTrackerContext)

  const cardContent = {paddingTop: 0}
  const divider = {margin: "20px 0"}

  return (
    <div>
      <Card>
        <CardHeader title="Expense Tracker" subheader="Powered By NotAndyforsure"></CardHeader>
        <CardContent>
          <Typography align="center" variant="h5">
            Total Balance ${balance}
          </Typography>
          <Typography variant="subtitle1" sx={{lineHeight: "1.5em", marginTop: "20px"}}>
            <InfoCard />
          </Typography>
          <Divider sx={divider} />
          <Forms />
        </CardContent>

        <CardContent sx={cardContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Records />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}
