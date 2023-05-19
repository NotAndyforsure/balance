import React from "react"
import {Snackbar, Alert} from "@mui/material"

export const CustomSnackbar = ({open, setOpen}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return

    setOpen(!open)
  }
  return (
    <div style={{marginTop: "15px", width: "100%"}}>
      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Transaction successful
        </Alert>
      </Snackbar>
    </div>
  )
}
