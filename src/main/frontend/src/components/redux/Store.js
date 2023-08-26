import {configureStore} from '@reduxjs/toolkit'
import stateReducer from './State'
import nameReducer from './TeamNameReducer'

import React from 'react'

export default configureStore({
  reducer : {
    renderState: stateReducer,
    name: nameReducer
  }
})