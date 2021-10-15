import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deviceGroupReducer from './reducers/deivceGroupReducer'
import authReducer from './reducers/authReducer'
import cabinetReducer from './reducers/cabinetReducer'
import playlistReducer from './reducers/playlistReducer'

const rootReducer = combineReducers({
  authReducer,
  cabinetReducer,
  deviceGroupReducer,
  playlistReducer
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store