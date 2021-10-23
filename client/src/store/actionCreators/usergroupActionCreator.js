import {
  USERGROUP_SET_GROUPS,
  USERGROUP_SET_FORM,
  USERGROUP_SET_DEVICE_GROUPS,
  USERGROUP_SET_SUCCEED
} from "../actions/usergroupActions"

export function usergroupSetGroups(data) {
  return {
    type: USERGROUP_SET_GROUPS,
    data
  }
}

export function usergroupLoadGroups() {
  return async(dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/usergroup", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(usergroupSetGroups(data))
    }
  }
}

export function usergroupDeleteGroup(groupId) {
  return async(dispatch) => {
    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/usergroup/" + groupId, {method, headers})

    if (responce.ok) {
      dispatch(usergroupLoadGroups())
    }
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
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responceUsers = await fetch("/api/usergroup/create", {method, body, headers})

    if (responceUsers.ok) {
      const methodDevice = 'PUT'
      const responceGroup = await fetch("/api/usergroup/devicegroup", {method: methodDevice, body, headers})
      if (responceGroup.ok) {
        dispatch(usergroupSetSucceed(true))
      }
    }
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
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/devicegroup", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(usergroupSetDeviceGroups(data))
    }
  }
}

export function usergroupSetSucceed(value) {
  return {
    type: USERGROUP_SET_SUCCEED,
    data: {isSucceed: value}
  }
}