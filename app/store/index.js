import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'


import createAccountReducer from '../reducers/createAccountReducer'
import getLocalDataReducer from '../reducers/getLocalDataReducer'
import trandingReducer from '../reducers/trandingReducer'
const rootReducer = combineReducers({
  	createAccountReducer,
  	getLocalDataReducer,
  	trandingReducer,
})
const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
)

export default store