import {DEVICE_GROUP_SET_SUCCEED, DEVICE_GROUP_SET_FORM} from '../actions/deviceGroupActions'

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

export function deviceGroupAddGroup (form) {
  return async (dispatch) => {
    console.log("form from thunk > ", form);

    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    
    const responce = await fetch("/api/devicegroup/create", {method, headers, body})
    if (responce.ok)
      dispatch(deviceGroupSetSucceed(true))
  }
}