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
const jwt = require('jsonwebtoken')

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

export function scheduleLoadAll(deviceGroupId) {
  return async(dispatch) => {
    dispatch(scheduleSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/schedule", {method, headers})

    let data = await responce.json()

    if (responce.ok){
      data = data.filter(s => s.devicegroup)

      if (deviceGroupId > 0)
        data = data.filter(s => s.devicegroupId === deviceGroupId)

      dispatch(scheduleSetAll(data))
    }

    dispatch(scheduleSetPreloader(false))
  }
}

export function scheduleDelete(scheduleId) {
  return async(dispatch) => {
    dispatch(scheduleSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/schedule/" + scheduleId, {method, headers})

    if (responce.ok){
      dispatch(scheduleLoadAll())
    }

    dispatch(scheduleSetPreloader(false))
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

export function shedulesGetDeviceGroups(deviceGroupId) {
  return async (dispatch) => {
    dispatch(scheduleSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}

    let responce
    let data
    if (deviceGroupId <= 0) {
      responce = await fetch("/api/devicegroup", {method, headers})
      data = await responce.json()
    } else {
      responce = await fetch("/api/devicegroup/" + deviceGroupId, {method, headers})
      data = await responce.json()
      data = [data]
    }

    if (responce.ok){
      dispatch(scheduleSetDeviceGroups(data))
    }

    dispatch(scheduleSetPreloader(false))
  }
}

export function shedulesGetPlaylists() {
  return async (dispatch) => {
    dispatch(scheduleSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/playlist", {method, headers})

    const data = await responce.json()
    if (responce.ok){
      dispatch(scheduleSetPlaylists(data))
    }

    dispatch(scheduleSetPreloader(false))
  }
}

export function schedulesAdd(form) {
  return async (dispatch) => {
    dispatch(scheduleSetPreloader(true))

    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/schedule", {method, body, headers})

    if (responce.ok) {
      dispatch(schedulesSetIsSucceed(true))
      dispatch(scheduleClearAddForm())
    }

    dispatch(scheduleSetPreloader(false))
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
    dispatch(scheduleSetPreloader(true))

    const method = 'PUT'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})

    const responce = await fetch("/api/schedule/" + scheduleId, {method, body, headers})

    if (responce.ok) {
      dispatch(schedulesSetIsSucceed(true))
      dispatch(scheduleClearUpdateForm())
    }

    dispatch(scheduleSetPreloader(false))
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

export function scheduleSetPreloader(isLoading) {
  return {
    type: SCHEDULE_SET_PRELOADER,
    data: isLoading
  }
}

export function scheduleSetUserData(name, value) {
  return {
    type: SCHEDULE_SET_USER_DATA,
    data: {name, value}
  }
}

export function scheduleGetUserData(token) {
  return async(dispatch) => {
    const dataToken = jwt.decode(token)

    if (dataToken.level !== 1) {
      dispatch(scheduleSetUserData("deviceGroupId", 0))
    } else {
      const method = 'GET'
      const headers = {'Content-Type': 'application/json'}
      const responceUser = await fetch("/api/user/" + dataToken.id, {method, headers})

      const dataUser = await responceUser.json()
      if (responceUser.ok) {
        if (dataUser.devices.length > 0)
        dispatch(scheduleSetUserData("deviceGroupId", dataUser.devices[0].id))
      }
    }
  }
}