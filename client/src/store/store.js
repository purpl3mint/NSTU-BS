import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deviceGroupReducer from './reducers/deivceGroupReducer'
import authReducer from './reducers/authReducer'
import cabinetReducer from './reducers/cabinetReducer'

const rootReducer = combineReducers({
  authReducer,
  cabinetReducer,
  deviceGroupReducer,
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store