import {
  USERGROUP_SET_GROUPS,
  USERGROUP_SET_FORM,
  USERGROUP_SET_DEVICE_GROUPS,
  USERGROUP_SET_SUCCEED,
  USERGROUP_CLEAR_FORM,
  USERGROUP_SET_PRELOADER
} from "../actions/usergroupActions"

const initialState = {
  userGroups: [],
  addForm: {
    name: "",
    devicegroupId: 0
  },
  deviceGroups: [],
  isSucceed: 0,
  preloader: false
}

function usergroupReducer (state = initialState, action) {
  switch (action.type) {
    case USERGROUP_SET_GROUPS:
      return { ...state, userGroups: action.data}

    case USERGROUP_SET_FORM:{
      const newAddForm = { ...state.addForm, [action.data.name]: action.data.value}
      return { ...state, addForm: newAddForm }
    }

    case USERGROUP_SET_DEVICE_GROUPS:
      return { ...state, deviceGroups: action.data }

    case USERGROUP_SET_SUCCEED:
      return { ...state, isSucceed: action.data.isSucceed }

    case USERGROUP_CLEAR_FORM: 
      return { ...state, addForm: initialState.addForm}

    case USERGROUP_SET_PRELOADER:
      return { ...state, preloader: action.data}
      
    default: 
      return state
  }
}

export default usergroupReducer