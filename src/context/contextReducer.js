export const contextReducer = (state, action) => {
  switch (action.type) {
    case "DELETE":
      state = state.filter((item) => item.id !== action.payload)

      localStorage.setItem("state", JSON.stringify(state))
      return state

    case "CREATE":
      state = [action.payload, ...state]
      localStorage.setItem("state", JSON.stringify(state))
      return state

    default:
      return state
  }
}
