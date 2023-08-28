import {configureStore} from '@reduxjs/toolkit'
import stateReducer from './State'
import nameReducer from './TeamNameReducer'
import UserIDReducer from './UserIDReducer'
import PlayerLeaguesReducer from './PlayerLeaguesReducer'

import React from 'react'

export default configureStore({
  reducer : {
    renderState: stateReducer,
    name: nameReducer,
    userID: UserIDReducer,
    leagues: PlayerLeaguesReducer
  }
})