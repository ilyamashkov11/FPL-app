import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
    name: "PlayerLeaguesReducer",
    initialState: {
        leagues: []
    },
    reducers: {
        setLeagues: (state, action) => {state.leagues = action.payload},
        getLeagues: (state) => {return state.leagues}
    }
})

export const {setLeagues, getLeagues} = counterSlice.actions
export default counterSlice.reducer