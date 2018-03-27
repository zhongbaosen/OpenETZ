import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'


import createAccountReducer from '../reducers/createAccountReducer'
import getLocalDataReducer from '../reducers/getLocalDataReducer'

const rootReducer = combineReducers({
  	createAccountReducer,
  	getLocalDataReducer,
})
const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
)

export default store