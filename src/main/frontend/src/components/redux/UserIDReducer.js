import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
    name: "userIDReducer",
    initialState: {
        userID: 0
    },
    reducers: {
        setID: (state, action) => {state.userID = action.payload},
        getID: (state) => {return state.userID}
    }
})

export const {setID, getID} = counterSlice.actions
export default counterSlice.reducer