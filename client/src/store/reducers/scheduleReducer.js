import {
  SCHEDULE_SET_ALL, 
  SCHEDULE_SET_CURRENT,
  SCHEDULE_SET_PLAYLISTS,
  SCHEDULE_SET_DEVICE_GROUPS,
  SCHEDULE_SET_ADD_FORM,
  SCHEDULE_SET_SUCCEED,
  SCHEDULE_SET_UPDATE_FORM,
  SCHEDULE_CLEAR_ADD_FORM,
  SCHEDULE_CLEAR_UPDATE_FORM,
  SCHEDULE_SET_PRELOADER,
  SCHEDULE_SET_USER_DATA
} from "../actions/scheduleActions"
//const jwt = require('jsonwebtoken')

const initialState = {
  schedules: [],
  currentScheduleId: 0,
  isSucceed: false,
  deviceGroups: [],
  playlists: [],
  addForm: {
    playlist_id: '',
    devices_id: '',
    time_start: '',
    time_end: ''
  },
  updateForm: {
    time_start: '',
    time_end: ''
  },
  preloader: false,
  userData: {
    deviceGroupId: 0
  }
}

function scheduleReducer(state = initialState, action) {
  switch(action.type){
    case SCHEDULE_SET_ALL: {
      return {
        ...state,
        schedules: action.data
      }
    }

    case SCHEDULE_SET_CURRENT: {
      return {
        ...state,
        currentScheduleId: action.scheduleId
      }
    }

    case SCHEDULE_SET_ADD_FORM: {
      let newAddForm = {...state.addForm, [action.data.target]: action.data.value}

      return {
        ...state,
        addForm: newAddForm
      }
    }

    case SCHEDULE_SET_DEVICE_GROUPS: {
      return {
        ...state,
        deviceGroups: action.data
      }
    }

    case SCHEDULE_SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.data
      }
    }

    case SCHEDULE_SET_SUCCEED: {
      return {
        ...state,
        isSucceed: action.data
      }
    }
    
    case SCHEDULE_SET_UPDATE_FORM: {
      let newUpdateForm = {...state.updateForm, [action.data.target]: action.data.value}

      return {
        ...state,
        updateForm: newUpdateForm
      }
    }

    case SCHEDULE_CLEAR_ADD_FORM: {
      return {...state, addForm: initialState.addForm}
    }

    case SCHEDULE_CLEAR_UPDATE_FORM: {
      return {...state, updateForm: initialState.updateForm}
    }

    case SCHEDULE_SET_PRELOADER: {
      return {...state, preloader: action.data}
    }

    case SCHEDULE_SET_USER_DATA: {
      const newUserData = {...state.userData, [action.data.name]: action.data.value}

      return {...state, userData: newUserData}
    }

    default: 
      return state
  }
}

export default scheduleReducer