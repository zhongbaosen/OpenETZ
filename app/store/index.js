import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'


import createAccountReducer from '../reducers/createAccountReducer'
import getLocalDataReducer from '../reducers/getLocalDataReducer'
import tradingManageReducer from '../reducers/tradingManageReducer'
import accountManageReducer from '../reducers/accountManageReducer'
const rootReducer = combineReducers({
  	createAccountReducer,
  	getLocalDataReducer,
  	tradingManageReducer,
  	accountManageReducer,
})
const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
)

export default store