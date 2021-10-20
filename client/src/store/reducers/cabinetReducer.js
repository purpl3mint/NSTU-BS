import {
  CABINET_SET_DATA
} from '../actions/cabinetActions'
const jwt = require('jsonwebtoken')

const initialState = {
  token: '',
  username: 'Неизвестно',
  level: 0,
  levelName: 'Неизвестно'
}

function cabinetReducer(state = initialState, action) {
  switch(action.type){
    case CABINET_SET_DATA: {
      const token = action.token;
      const data = jwt.decode(token)
      let username = "Неизвестно"
      let level = -1
      let levelName = "Неизвестно"

      if (data && data.username)
        username = data.username

      if (data && data.level)
        level = data.level

      switch (level){
        case 0: 
          levelName = "Пользователь"
          break
        case 1: 
          levelName = "Модератор"
          break
        case 2:
          levelName = "Администратор"
          break

        default:
          levelName = "Неизвестно"
      }

      return {...state, token, username, level, levelName}
    }

    default: {
      return state
    }
  }
}

export default cabinetReducer