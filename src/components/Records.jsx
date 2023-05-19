import React, {useContext} from "react"
import {ExpenseTrackerContext} from "../context/context"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@mui/material"
import {Delete, MoneyOff} from "@mui/icons-material"

export const Records = () => {
  const avatarIncome = {
    color: "#fff",
    backgroundColor: "#4caf50",
  }

  const avatarExpense = {
    color: "#fff",
    backgroundColor: "#f44336",
  }

  const list = {maxHeight: "150px", overflow: "auto"}

  const {deleteTransaction, transactions} = useContext(ExpenseTrackerContext)
  return (
    <div>
      <List sx={list} dense={false}>
        {transactions.map((trans) => (
          <Slide key={trans.id} direction="down" in mountOnEnter unmountOnExit>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={trans.type === "Income" ? avatarIncome : avatarExpense}>
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={trans.category}
                secondary={`$${trans.amount} - ${trans.date}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTransaction(trans.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </List>
    </div>
  )
}
