import {
  AUTH_SET_FORM
} from '../actions/authActions'

const initialState = {
  form: {
    username: '',
    password: ''
  }
}

function authReducer (state = initialState, action) {
  console.log('auth reducer > ', action);
  switch(action.type) {
    case AUTH_SET_FORM: {
      const newForm = {...state.form, [action.data.target]: action.data.value}
      const result = {...state, form: newForm}
      return result
    }

    default: 
      return state
  }
}

export default authReducer