import {
  VIDEO_SET_VIDEOS,
  VIDEO_SET_CURRENT_VIDEO,
  VIDEO_SET_USER_LEVEL,
  VIDEO_SET_ADD_FORM,
  VIDEO_SET_SUCCEED,
  VIDEO_SET_APPROVED,
  VIDEO_CLEAR_ADD_FORM
} from "../actions/videoActions"

export function videoSetVideos(data) {
  return {
    type: VIDEO_SET_VIDEOS,
    data
  }
}

export function videoLoadVideos() {
  return async(dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content", {method, headers})

    const data = await responce.json()
    if (responce.ok) {
      dispatch(videoSetVideos(data))
    }
  }
}

export function videoDeleteVideo(videoId) {
  return async(dispatch) => {
    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content/" + videoId, {method, headers})

    if (responce.ok) {
      dispatch(videoLoadVideos())
    }
  }
}

export function videoSetCurrentVideo(id, name, link, source, isApproved) {
  return {
    type: VIDEO_SET_CURRENT_VIDEO,
    data: {id, name, link, source, isApproved}
  }
}

export function videoSetUserLevel(level) {
  return {
    type: VIDEO_SET_USER_LEVEL,
    data: { userLevel: level }
  }
}

export function videoSetAddForm(name, value) {
  return {
    type: VIDEO_SET_ADD_FORM,
    data: {name, value}
  }
}

export function videoAdd(form) {
  return async (dispatch) => {
    if (form && form.filetype === "youtube") {
      const method = 'POST'
      const headers = {'Content-Type': 'application/json'}
      const body = JSON.stringify({...form})
      const responce = await fetch("/api/content/create", {method, body, headers})

      if (responce.ok) {
        dispatch(videoSetSucceed(true))
        dispatch(videoClearAddForm())
      }
    }
    else if (form && form.filetype !== "youtube") {
      const data = new FormData()
      data.append("name", form.name)
      data.append("filetype", form.filetype)
      data.append("outerLink", form.outerLink)
      data.append("file", form.file)
                
      const XHRRequest = new XMLHttpRequest()
      XHRRequest.open("POST", "/api/content/create")
      XHRRequest.send(data)


      XHRRequest.onload = function() {
        if (XHRRequest.status === 200)
          dispatch(videoSetSucceed(true))
          dispatch(videoClearAddForm())
      }
    }

  }
}

export function videoSetSucceed(value) {
  return {
    type: VIDEO_SET_SUCCEED,
    data: { isSucceed: value }
  }
}

export function videoSetApprovedVideo(currentVideo) {
  return async(dispatch) => {
    const method = 'PUT'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({id: currentVideo.id})
    const responce = await fetch("/api/content/approving", {method, body, headers})

    if (responce.ok) {
      dispatch(videoLoadVideos())
      dispatch(videoSetCurrentVideo(
        currentVideo.id, 
        currentVideo.name, 
        currentVideo.link, 
        currentVideo.source, 
        true))
    }
  }
}

export function videoSetApprovedField(value) {
  return {
    type: VIDEO_SET_APPROVED,
    data: {value}
  }
}

export function videoGetApproved(videoId) {
  return async(dispatch) => {
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/content/" + videoId, {method, headers})

    const data = await responce.json()

    if (responce.ok) {
      dispatch(videoSetApprovedField(data.is_approved))
    }
  }
}

export function videoClearAddForm() {
  return {
    type: VIDEO_CLEAR_ADD_FORM
  }
}