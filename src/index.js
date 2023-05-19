import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import {Provider} from "./context/context"
import {SpeechProvider} from "@speechly/react-client"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <SpeechProvider appId={process.env.REACT_APP_ID} language="en-US">
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>
  </React.StrictMode>
)
