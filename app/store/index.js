import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'


import createAccountReducer from '../reducers/createAccountReducer'


const rootReducer = combineReducers({
  	createAccountReducer,
})
const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
)

export default store