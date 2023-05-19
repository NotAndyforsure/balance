import React from "react"
import {Details} from "./components/Details"
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  BigTranscript,
  IntroPopup,
} from "@speechly/react-ui"
import {Grid} from "@mui/material"
import {Main} from "./components/Main"
import {useMediaQuery} from "@mui/material"

const App = () => {
  const media = useMediaQuery("(min-width:601px)")
  const mediaTwo = useMediaQuery("(max-width:600px)")

  return (
    <div>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justify="center"
        sx={{height: "100vh", padding: "0.5rem"}}
      >
        {media && (
          <Grid item xs={12} sm={4}>
            <Details title="Income" />
          </Grid>
        )}

        <Grid item xs={12} sm={4}>
          <Main />
        </Grid>
        {mediaTwo && (
          <Grid item xs={12} sm={4}>
            <Details title="Income" />
          </Grid>
        )}

        <Grid item xs={12} sm={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer placement="top">
        <PushToTalkButton placement="bottom" />
        <BigTranscript placement="top" />
        <IntroPopup />
      </PushToTalkButtonContainer>
    </div>
  )
}

export default App
