import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deviceGroupReducer from './reducers/deivceGroupReducer'

const rootReducer = combineReducers({
  deviceGroupReducer,
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store