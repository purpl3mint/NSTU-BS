import {
  DEVICE_GROUP_SET_SUCCEED, 
  DEVICE_GROUP_SET_FORM, 
  DEVICE_GROUP_SET_GROUPS,
  DEVICE_GROUP_CLEAR_FORM,
  DEVICE_GROUP_SET_PRELOADER
} from '../actions/deviceGroupActions'

const initialState = {
  isSucceed: false,
  form: {
    name: '',
    link: ''
  },
  deviceGroups: [],
  preloader: false
}


function deviceGroupReducer(state = initialState, action) {
  switch (action.type) {
    case DEVICE_GROUP_SET_SUCCEED: {
      return {...state, isSucceed: action.data}
    }
    case DEVICE_GROUP_SET_FORM:{
      const newForm = {...state.form, [action.data.target]: action.data.value}
      const result = {...state, form: newForm}
      return result
    }
    case DEVICE_GROUP_SET_GROUPS: {
      return {...state, deviceGroups: action.data}
    }
    case DEVICE_GROUP_CLEAR_FORM: {
      return {...state, form: initialState.form}
    }
    case DEVICE_GROUP_SET_PRELOADER: {
      return {...state, preloader: action.data}
    }
    default: return state
  }
}

export default deviceGroupReducer