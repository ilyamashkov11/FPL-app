import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
    name: "teamNameReducer",
    initialState: {
        teamName: ""
    },
    reducers: {
        setName: (state, action) => {state.teamName = action.payload},
        getName: (state) => {return state.teamName}
    }
})

export const {setName, getName} = counterSlice.actions
export default counterSlice.reducer