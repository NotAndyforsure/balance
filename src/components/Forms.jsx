import React, {useState, useContext, useEffect} from "react"
import {TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import {ExpenseTrackerContext} from "../context/context"
import {useSpeechContext} from "@speechly/react-client"
import {v4 as uuidv4} from "uuid"
import {incomeCategories, expenseCategories} from "../assets/categories"
import {CustomSnackbar} from "./Snackbar"

export const Forms = () => {
  const button = {
    marginTop: "20px",
  }

  const initialState = {
    type: "Income",
    category: "Business",
    amount: "0",
    date: "",
  }

  const [formData, setFormData] = useState(initialState)
  const [open, setOpen] = useState(false)

  const {createTransaction} = useContext(ExpenseTrackerContext)

  const handleCreate = () => {
    if (!formData.date || !parseInt(formData.amount)) {
      return
    }

    const transaction = {...formData, amount: Number(formData.amount), id: uuidv4()}

    createTransaction(transaction)
    setOpen(true)
    setFormData(initialState)
  }

  const categories = formData.type === "Income" ? incomeCategories : expenseCategories

  const {segment} = useSpeechContext()
  const incomeArray = incomeCategories.map((iC) => iC.type)
  const expenseArray = expenseCategories.map((iC) => iC.type)

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_income") {
        setFormData({...formData, type: "Income"})
      } else if (segment.intent.intent === "add_expense") {
        setFormData({...formData, type: "Expense"})
      } else if (segment.intent.intent === "create_transaction" && segment.isFinal) {
        handleCreate()
      } else if (segment.intent.intent === "cancel_transaction" && segment.isFinal) {
        setFormData(initialState)
      }
      segment.entities.forEach((e) => {
        switch (e.type) {
          case "amount":
            setFormData({...formData, amount: e.value})
            break
          case "category":
            const value = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
            if (incomeArray.includes(value)) {
              setFormData({...formData, category: value, type: "Income"})
            } else if (expenseArray.includes(value)) {
              setFormData({...formData, type: "Expense", category: value})
            }
            break
          case "date":
            setFormData({...formData, date: e.value})
            break
          default:
            break
        }
      })

      if (segment.isFinal && formData.type && formData.category && formData.date) {
        handleCreate()
      }
    }
  }, [segment])

  return (
    <Grid container spacing={2}>
      <CustomSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={6}>
        <FormControl fullWidth sx={{marginTop: "30px"}}>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={({target}) => {
              target.value === "Income"
                ? setFormData({...formData, type: target.value, category: "Business"})
                : setFormData({...formData, type: target.value, category: "Bills"})
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth sx={{marginTop: "30px"}}>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={({target}) => setFormData({...formData, category: target.value})}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.type} value={cat.type}>
                {cat.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          value={formData.amount}
          onChange={({target}) => setFormData({...formData, amount: target.value})}
          type="number"
          label="Ammount"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          value={formData.date}
          onChange={({target}) => setFormData({...formData, date: target.value})}
          type="date"
          label="Date"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button sx={button} variant="outlined" color="primary" fullWidth onClick={handleCreate}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}
