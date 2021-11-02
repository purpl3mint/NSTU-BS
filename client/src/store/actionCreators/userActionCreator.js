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
  USER_CLEAR_GROUP_FORM
} from "../actions/userActions"

export function userSetAddForm(name, value){
  return {
    type: USER_SET_ADD_FORM,
    data: {name, value}
  }
}

export function userAdd(form){
  return async(dispatch) => {
    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/user/registration", {method, body, headers})

    if (responce.ok) {
      dispatch(userSetSucceed(true))
      dispatch(userClearAddForm())
    }
  }
}

export function userSetSucceed(data){
  return {
    type: USER_SET_SUCCEED,
    data
  }
}

export function userSetGroups(data) {
  return {
    type: USER_SET_GROUPS,
    data
  }
}

export function userLoadGroup() {
  return async(dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/usergroup", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(userSetGroups(data))
    }
  }
}

export function userSetCurrentUsername(username) {
  return {
    type: USER_SET_CURRENT_USERNAME,
    data: username
  }
}

export function userSetCurrentId(userId) {
  return {
    type: USER_SET_CURRENT_ID,
    data: userId
  }
}

export function userSetCurrentLevel(userLevel) {
  return {
    type: USER_SET_CURRENT_LEVEL,
    data: userLevel
  }
}

export function userSetGroupsForm(name, value){
  return {
    type: USER_SET_GROUP_FORM,
    data: {name, value}
  }
}

export function userSetGroup(form, userId) {
  return async(dispatch) => {
    const method = 'PUT'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/user/setgroup/" + userId, {method, body, headers})

    if (responce.ok) {
      dispatch(userSetSucceed(true))
      dispatch(userClearGroupForm())
    }
  }
}

export function userSetUsers(data) {
  return {
    type: USER_SET_USERS,
    data
  }
}

export function userLoadUsers() {
  return async(dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/user", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(userSetUsers(data))
    }
  }
}

export function userDeleteUser(userId) {
  return async(dispatch) => {
    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/user/" + userId, {method, headers})

    if (responce.ok) {
      dispatch(userLoadUsers())
    }
  }
}

export function userClearAddForm () {
  return {
    type: USER_CLEAR_ADD_FORM
  }
}

export function userClearGroupForm () {
  return {
    type: USER_CLEAR_GROUP_FORM
  }
}