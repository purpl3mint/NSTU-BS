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