import React from "react"
import {Card, CardHeader, CardContent, Typography} from "@mui/material"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Doughnut} from "react-chartjs-2"
import {useTransactions} from "../useTransactions"
ChartJS.register(ArcElement, Legend, Tooltip)

export const Details = ({title}) => {
  const styleIncome = {
    borderBottom: "10px solid rgba(0,255,0,0.5)",
  }
  const styleExpense = {
    borderBottom: "10px solid rgba(255,0,0,0.5)",
  }
  const {total, chartData} = useTransactions(title)

  return (
    <div>
      <Card sx={title === "Income" ? styleIncome : styleExpense}>
        <CardHeader title={title}></CardHeader>
        <CardContent>
          <Typography variant="h5">${total}</Typography>
          <Doughnut data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}
