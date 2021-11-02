import {
  USER_SET_ADD_FORM,
  USER_SET_SUCCEED,
  USER_SET_GROUPS,
  USER_SET_CURRENT_USERNAME,
  USER_SET_CURRENT_ID,
  USER_SET_CURRENT_LEVEL,
  USER_SET_GROUP_FORM,
  USER_SET_USERS,
  USER_CLEAR_ADD_FORM,
  USER_CLEAR_GROUP_FORM,
  USER_SET_PRELOADER
} from "../actions/userActions"

const initialState = {
  addForm: {
    username: "",
    password: "",
    level: 0
  },
  isSucceed: false,
  userGroups: [],
  currentUsername: "",
  currentUserId: 0,
  currentUserLevel: 0,
  groupForm: {
    group_id: 0
  },
  users: [],
  preloader: false
}

function userReducer (state = initialState, action) {
  switch(action.type){
    case USER_SET_ADD_FORM: {
      let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
      return { ...state, addForm: newAddForm }
    }

    case USER_SET_SUCCEED:
      return { ...state, isSucceed: action.data }

    case USER_SET_GROUPS:
      return { ...state, userGroups: action.data }

    case USER_SET_CURRENT_USERNAME:
      return { ...state, currentUsername: action.data }

    case USER_SET_CURRENT_ID:
      return { ...state, currentUserId: action.data }

    case USER_SET_CURRENT_LEVEL:
      return { ...state, currentUserLevel: action.data }

    case USER_SET_GROUP_FORM:{
      let newGroupForm = {...state.groupForm, [action.data.name]: action.data.value}
      return { ...state, groupForm: newGroupForm }
    }

    case USER_SET_USERS:
      return { ...state, users: action.data }

    case USER_CLEAR_ADD_FORM:
      return { ...state, addForm: initialState.addForm }

    case USER_CLEAR_GROUP_FORM: 
      return { ...state, groupForm: initialState.groupForm }

    case USER_SET_PRELOADER:
      return { ...state, preloader: action.data}

    default: 
      return state
  }
}

export default userReducer