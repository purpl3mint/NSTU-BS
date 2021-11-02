import {
  PLAYLIST_NEW_SET_SUCCEED, 
  PLAYLIST_NEW_SET_FORM,
  PLAYLIST_SET_ALL,
  PLAYLIST_SET_CURRENT,
  PLAYLIST_SET_CONTENT,
  PLAYLIST_SET_ALL_VIDEOS,
  PLAYLIST_NEW_CONTENT_FORM,
  PLAYLIST_SET_CURRENT_VIDEO,
  PLAYLIST_NEW_CLEAR_FORM,
  PLAYLIST_NEW_CLEAR_CONTENT_FORM,
  PLAYLIST_SET_PRELOADER
} from '../actions/playlistActions'

export function playlistNewSetSucceed (newIsSucceed) {
  return {
    type: PLAYLIST_NEW_SET_SUCCEED,
    data: newIsSucceed
  }
}

export function playlistNewSetForm (target, value) {
  return {
    type: PLAYLIST_NEW_SET_FORM,
    data: { target, value }
  }
}

export function playlistNewCreate (form) {
  return async (dispatch) => {
    dispatch(playlistSetPreloader(true))

    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})

    const responce = await fetch("/api/playlist/create", {method, headers, body})
    if (responce.ok)
      dispatch(playlistNewSetSucceed(true))
    
    dispatch(playlistNewClearForm())
    dispatch(playlistSetPreloader(false))
  }
}

export function playlistSetAll (data) {
  return {
    type: PLAYLIST_SET_ALL,
    data
  }
}

export function playlistLoadAll () {
  return async (dispatch) => {
    dispatch(playlistSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/playlist", {method, headers})
    
    const data = await responce.json()
    if (responce.ok){
      dispatch(playlistSetAll(data))
    }

    dispatch(playlistSetPreloader(false))
  }
}

export function playlistDelete (id) {
  return async (dispatch) => {
    dispatch(playlistSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/playlist/" + id, {method, headers})

    if (responce.ok){
      dispatch(playlistLoadAll())
    }

    dispatch(playlistSetPreloader(false))
  }
}

export function playlistSetCurrent (id, name) {
  return {
    type: PLAYLIST_SET_CURRENT,
    data: {id, name}
  }
}

export function playlistSetContent (data) {
  return {
    type: PLAYLIST_SET_CONTENT,
    data
  }
}

export function playlistLoadContent (playlistId) {
  return async (dispatch) => {
    dispatch(playlistSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/playlist/content/" + playlistId, {method, headers})

    const data = await responce.json()
    if (responce.ok){
      dispatch(playlistSetContent(data))
    }

    dispatch(playlistSetPreloader(false))
  }
}

export function playlistDeleteContent (playlistId, contentId) {
  return async (dispatch) => {
    dispatch(playlistSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/playlist/deletecontent/" + contentId, {method, headers})

    if (responce.ok){
      dispatch(playlistLoadContent(playlistId))
    }

    dispatch(playlistSetPreloader(false))
  }
}

export function playlistAddContent (playlistId, contentId, position){
  return async (dispatch) => {
    dispatch(playlistSetPreloader(true))

    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({
      "content_id": contentId, 
      "position": position, 
      "playlist_id": playlistId
    })

    const responce = await fetch("/api/playlist/addcontent", {method, headers, body})

    if (responce.ok){
      dispatch(playlistLoadContent(playlistId))
      dispatch(playlistNewSetSucceed(true))
      dispatch(playlistNewContentClearForm())
    }

    dispatch(playlistSetPreloader(false))
  }
}

export function playlistSetAllVideos(data) {
  return {
    type: PLAYLIST_SET_ALL_VIDEOS,
    data
  }
}

export function playlistGetInsertableVideos() {
  return async (dispatch) => {
    dispatch(playlistSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content", {method, headers})

    const data = await responce.json()
    const filteredData = data.filter(d => d.is_approved)
    if (responce.ok){
      dispatch(playlistSetAllVideos(filteredData))
    }

    dispatch(playlistSetPreloader(false))
  }
}

export function playlistNewContentForm (target, value) {
  return {
    type: PLAYLIST_NEW_CONTENT_FORM,
    data: { target, value }
  }
}

export function playlistSetCurrentVideo (id, name) {
  return {
    type: PLAYLIST_SET_CURRENT_VIDEO,
    data: {id, name}
  }
}

export function playlistNewClearForm () {
  return {
    type: PLAYLIST_NEW_CLEAR_FORM
  }
}

export function playlistNewContentClearForm () {
  return {
    type: PLAYLIST_NEW_CLEAR_CONTENT_FORM
  }
}

export function playlistSetPreloader(isLoading) {
  return {
    type: PLAYLIST_SET_PRELOADER,
    data: isLoading
  }
}