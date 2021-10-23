import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import deviceGroupReducer from './reducers/deivceGroupReducer'
import authReducer from './reducers/authReducer'
import cabinetReducer from './reducers/cabinetReducer'
import playlistReducer from './reducers/playlistReducer'
import scheduleReducer from './reducers/scheduleReducer'
import userReducer from './reducers/userReducer'
import videoReducer from './reducers/videoReducer'
import usergroupReducer from './reducers/usergroupReducer'

const rootReducer = combineReducers({
  authReducer,
  cabinetReducer,
  deviceGroupReducer,
  playlistReducer,
  scheduleReducer,
  userReducer,
  videoReducer,
  usergroupReducer
})

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
))

export default store