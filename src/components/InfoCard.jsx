import React from "react"

export const InfoCard = () => {
  const num = Math.round(Math.random())
  return (
    <div style={{textAlign: "center", padding: "0 10%"}}>
      Try saying:
      <br />
      Add {num ? "Income " : "Expense "}
      for {num ? "$100 " : "$50 "}
      in category {num ? "Business " : "Bills "}
      for {num ? "Monday" : "Friday"}
    </div>
  )
}
