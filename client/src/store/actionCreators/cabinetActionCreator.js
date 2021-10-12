import {
  CABINET_SET_DATA
} from '../actions/cabinetActions'

export function cabinetSetData(token) {
  return{
    type: CABINET_SET_DATA,
    token
  }
}