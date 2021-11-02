import {
  DEVICE_GROUP_SET_SUCCEED, 
  DEVICE_GROUP_SET_FORM, 
  DEVICE_GROUP_SET_GROUPS,
  DEVICE_GROUP_CLEAR_FORM,
  DEVICE_GROUP_SET_PRELOADER
} from '../actions/deviceGroupActions'

export function deviceGroupSetSucceed (newIsSucceed) {
  return {
    type: DEVICE_GROUP_SET_SUCCEED,
    data: newIsSucceed
  }
}

export function deviceGroupSetForm (target, value) {
  return {
    type: DEVICE_GROUP_SET_FORM,
    data: { target, value }
  }
}

export function deviceGroupClearForm () {
  return {
    type: DEVICE_GROUP_CLEAR_FORM
  }
}

export function deviceGroupSetGroups (data) {
  return {
    type: DEVICE_GROUP_SET_GROUPS,
    data
  }
}

export function deviceGroupAdd (form) {
  return async (dispatch) => {
    dispatch(deviceGroupSetPreloader(true))

    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})

    const responce = await fetch("/api/devicegroup/create", {method, headers, body})
    if (responce.ok)
      dispatch(deviceGroupSetSucceed(true))

    dispatch(deviceGroupClearForm())
    dispatch(deviceGroupSetPreloader(false))
  }
}

export function deviceGroupLoad() {
  return async (dispatch) => {
    dispatch(deviceGroupSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/devicegroup", {method, headers})

    const data = await responce.json()
    if (responce.ok){
      dispatch(deviceGroupSetGroups(data))
    }
    dispatch(deviceGroupSetPreloader(false))
  }
}

export function deviceGroupDelete(id) {
  return async (dispatch) => {
    dispatch(deviceGroupSetPreloader(true))
    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}

    const responce = await fetch("/api/devicegroup/" + id, {method, headers})
    if (responce.ok)
      dispatch(deviceGroupLoad())

    dispatch(deviceGroupSetPreloader(false))
  }
}

export function deviceGroupSetPreloader(isLoading) {
  return {
    type: DEVICE_GROUP_SET_PRELOADER,
    data: isLoading
  }
}
