import React, {createContext, useReducer} from "react"
import {contextReducer} from "./contextReducer"

export const ExpenseTrackerContext = createContext([])

export const Provider = ({children}) => {
  const initialState = JSON.parse(localStorage.getItem("state")) || []
  const [transactions, dispatch] = useReducer(contextReducer, initialState)

  const deleteTransaction = (id) => dispatch({type: "DELETE", payload: id})

  const createTransaction = (obj) => dispatch({type: "CREATE", payload: obj})

  const balance = transactions.reduce((vari, currVal) => {
    return currVal.type === "Expense" ? (vari -= currVal.amount) : (vari += currVal.amount)
  }, 0)

  return (
    <ExpenseTrackerContext.Provider
      value={{deleteTransaction, createTransaction, transactions, balance}}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  )
}
