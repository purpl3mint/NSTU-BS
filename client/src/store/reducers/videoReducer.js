import {
  VIDEO_SET_VIDEOS,
  VIDEO_SET_CURRENT_VIDEO,
  VIDEO_SET_USER_LEVEL,
  VIDEO_SET_ADD_FORM,
  VIDEO_SET_SUCCEED,
  VIDEO_SET_APPROVED,
  VIDEO_CLEAR_ADD_FORM,
  VIDEO_SET_PRELOADER
} from "../actions/videoActions"

const initialState = {
  videos: [],
  currentVideo: {
    id: 0,
    name: "",
    link: "",
    source: "",
    isApproved: false
  },
  userLevel: 0,
  addVideoForm: {
    name: "",
    filetype: "",
    outerLink: "",
    file: null
  },
  isSucceed: false,
  preloader: false
}

function videoReducer (state = initialState, action) {
  switch (action.type) {
    case VIDEO_SET_VIDEOS: 
      return { ...state, videos: action.data }

    case VIDEO_SET_CURRENT_VIDEO: 
      const newCurrentVideo = {
        id: action.data.id,
        name: action.data.name,
        link: action.data.link,
        source: action.data.source,
        isApproved: state.currentVideo.isApproved
      }
      return { ...state, currentVideo: newCurrentVideo }

    case VIDEO_SET_USER_LEVEL: 
      return { ...state, userLevel: action.data.userLevel }

    case VIDEO_SET_ADD_FORM: {
      const newAddVideoForm = { ...state.addVideoForm, [action.data.name]: action.data.value}
      return { ...state, addVideoForm: newAddVideoForm }
    }

    case VIDEO_SET_SUCCEED: 
      return { ...state, isSucceed: action.data.isSucceed }

    case VIDEO_SET_APPROVED: {
      const newCurrentVideo = { ...state.currentVideo, isApproved: action.data.value }
      return { ...state, currentVideo: newCurrentVideo}
    }

    case VIDEO_CLEAR_ADD_FORM: {
      return {...state, addVideoForm: initialState.addVideoForm}
    }

    case VIDEO_SET_PRELOADER: {
      return {...state, preloader: action.data}
    }

    default:
      return state
  }
}

export default videoReducer