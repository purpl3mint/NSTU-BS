import {
  USERGROUP_SET_GROUPS,
  USERGROUP_SET_FORM,
  USERGROUP_SET_DEVICE_GROUPS,
  USERGROUP_SET_SUCCEED,
  USERGROUP_CLEAR_FORM,
  USERGROUP_SET_PRELOADER
} from "../actions/usergroupActions"

export function usergroupSetGroups(data) {
  return {
    type: USERGROUP_SET_GROUPS,
    data
  }
}

export function usergroupLoadGroups() {
  return async(dispatch) => {
    dispatch(usergroupSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/usergroup", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(usergroupSetGroups(data))
    }

    dispatch(usergroupSetPreloader(false))
  }
}

export function usergroupDeleteGroup(groupId) {
  return async(dispatch) => {
    dispatch(usergroupSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/usergroup/" + groupId, {method, headers})

    if (responce.ok) {
      dispatch(usergroupLoadGroups())
    }

    dispatch(usergroupSetPreloader(false))
  }
}

export function usergroupSetForm(name, value) {
  return {
    type: USERGROUP_SET_FORM,
    data: { name, value }
  }
}

export function usergroupAdd(form) {
  return async(dispatch) => {
    dispatch(usergroupSetPreloader(true))

    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responceUsers = await fetch("/api/usergroup/create", {method, body, headers})

    if (responceUsers.ok) {
      const methodDevice = 'PUT'
      const responceGroup = await fetch("/api/usergroup/devicegroup", {method: methodDevice, body, headers})
      if (responceGroup.ok) {
        dispatch(usergroupSetSucceed(true))
        dispatch(usergroupClearForm())
      }
    }

    dispatch(usergroupSetPreloader(false))
  }
}

export function usergroupSetDeviceGroups(data) {
  return {
    type: USERGROUP_SET_DEVICE_GROUPS,
    data
  }
}

export function usergroupLoadDeviceGroups() {
  return async(dispatch) => {
    dispatch(usergroupSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/devicegroup", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(usergroupSetDeviceGroups(data))
    }

    dispatch(usergroupSetPreloader(false))
  }
}

export function usergroupSetSucceed(value) {
  return {
    type: USERGROUP_SET_SUCCEED,
    data: {isSucceed: value}
  }
}

export function usergroupClearForm () {
  return {
    type: USERGROUP_CLEAR_FORM
  }
}

export function usergroupSetPreloader (isLoading) {
  return {
    type: USERGROUP_SET_PRELOADER,
    data: isLoading
  }
}