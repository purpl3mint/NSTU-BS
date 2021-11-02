import {
  SCHEDULE_SET_ALL,
  SCHEDULE_SET_CURRENT,
  SCHEDULE_SET_PLAYLISTS,
  SCHEDULE_SET_DEVICE_GROUPS,
  SCHEDULE_SET_ADD_FORM,
  SCHEDULE_SET_SUCCEED,
  SCHEDULE_SET_UPDATE_FORM,
  SCHEDULE_CLEAR_ADD_FORM,
  SCHEDULE_CLEAR_UPDATE_FORM
} from "../actions/scheduleActions"

export function scheduleSetAll(data){
  return{
    type: SCHEDULE_SET_ALL,
    data
  }
}

export function scheduleSetCurrent(scheduleId){
  return{
    type: SCHEDULE_SET_CURRENT,
    scheduleId
  }
}

export function scheduleLoadAll() {
  return async(dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/schedule", {method, headers})

    const data = await responce.json()
    if (responce.ok){
      dispatch(scheduleSetAll(data))
    }
  }
}

export function scheduleDelete(scheduleId) {
  return async(dispatch) => {
    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/schedule/" + scheduleId, {method, headers})

    if (responce.ok){
      dispatch(scheduleLoadAll())
    }
  }
}

export function scheduleSetAddForm(target, value){
  return {
    type: SCHEDULE_SET_ADD_FORM,
    data: { target, value }
  }
}

export function scheduleSetDeviceGroups(data){
  return {
    type: SCHEDULE_SET_DEVICE_GROUPS,
    data
  }
}

export function scheduleSetPlaylists(data) {
  return {
    type: SCHEDULE_SET_PLAYLISTS,
    data
  }
}

export function shedulesGetDeviceGroups() {
  return async (dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/devicegroup", {method, headers})

    const data = await responce.json()
    if (responce.ok){
      dispatch(scheduleSetDeviceGroups(data))
    }
  }
}

export function shedulesGetPlaylists() {
  return async (dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/playlist", {method, headers})

    const data = await responce.json()
    if (responce.ok){
      dispatch(scheduleSetPlaylists(data))
    }
  }
}

export function schedulesAdd(form) {
  return async (dispatch) => {
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/schedule", {method, body, headers})

    if (responce.ok) {
      dispatch(schedulesSetIsSucceed(true))
      dispatch(scheduleClearAddForm())
    }
  }
}

export function schedulesSetIsSucceed(value) {
  return {
    type: SCHEDULE_SET_SUCCEED,
    data: value
  }
}

export function schedulesSetUpdateForm(target, value) {
  return {
    type: SCHEDULE_SET_UPDATE_FORM,
    data: {target, value}
  }
}

export function schedulesUpdate(form, scheduleId) {
  return async (dispatch) => {
    const method = 'PUT'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})

    const responce = await fetch("/api/schedule/" + scheduleId, {method, body, headers})

    if (responce.ok) {
      dispatch(schedulesSetIsSucceed(true))
      dispatch(scheduleClearUpdateForm())
    }
  }
}

export function scheduleClearAddForm () {
  return {
    type: SCHEDULE_CLEAR_ADD_FORM
  }
}

export function scheduleClearUpdateForm () {
  return {
    type: SCHEDULE_CLEAR_UPDATE_FORM
  }
}