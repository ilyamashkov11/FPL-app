import {configureStore} from '@reduxjs/toolkit'
import stateReducer from './State'

import React from 'react'

export default configureStore({
  reducer : {
    renderState: stateReducer
  }
})