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
  SCHEDULE_SET_PRELOADER
} from "../actions/scheduleActions"

const initialState = {
  schedules: [],
  currentScheduleId: 0,
  isSucceed: false,
  deviceGroups: [],
  playlists: [],
  addForm: {
    playlist_id: '',
    devices_id: '',
    timeStart__hour: '00',
    timeStart__min: '00',
    timeStart__sec: '00',
    timeEnd__hour: '00',
    timeEnd__min: '00',
    timeEnd__sec: '00',
    time_start: '',
    time_end: ''
  },
  updateForm: {
    timeStart__hour: '00',
    timeStart__min: '00',
    timeStart__sec: '00',
    timeEnd__hour: '00',
    timeEnd__min: '00',
    timeEnd__sec: '00',
    time_start: '',
    time_end: ''
  },
  preloader: false
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
      newAddForm = {
        ...newAddForm,
        time_start: newAddForm.timeStart__hour + ":" + newAddForm.timeStart__min + ":" + newAddForm.timeStart__sec,
        time_end: newAddForm.timeEnd__hour + ":" + newAddForm.timeEnd__min + ":" + newAddForm.timeEnd__sec
      }
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
      newUpdateForm = {
        ...newUpdateForm,
        time_start: newUpdateForm.timeStart__hour + ":" + newUpdateForm.timeStart__min + ":" + newUpdateForm.timeStart__sec,
        time_end: newUpdateForm.timeEnd__hour + ":" + newUpdateForm.timeEnd__min + ":" + newUpdateForm.timeEnd__sec
      }

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

    default: 
      return state
  }
}

export default scheduleReducer