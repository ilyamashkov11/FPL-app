import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
    name: "renderStateName",
    initialState: {
        renderState: false
    },
    reducers: {
        setTrue: (state) => {state.renderState = true},
        setFalse: (state) => {state.renderState = false}
    }
})

export const {setTrue, setFalse} = counterSlice.actions
export default counterSlice.reducer