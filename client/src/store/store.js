import { combineReducers, createStore } from 'redux'
import deviceGroupReducer from './reducers/deivceGroupReducer'

const rootReducer = combineReducers({
  deviceGroupReducer,
})

const store = createStore(rootReducer)

export default store