import {
  PLAYLIST_NEW_SET_SUCCEED, 
  PLAYLIST_NEW_SET_FORM,
  PLAYLIST_SET_ALL,
  PLAYLIST_SET_CURRENT,
  PLAYLIST_SET_CONTENT,
  PLAYLIST_SET_ALL_VIDEOS,
  PLAYLIST_NEW_CONTENT_FORM
} from '../actions/playlistActions'

const initialState = {
  isSucceed: false,
  form: {
    name: ''
  },
  playlists: [],
  currentPlaylistId: 0,
  currentPlaylistName: '',
  currentPlaylistContents: [],
  addContentForm: {
    content_id: 0,
    position: 0
  },
  allVideos: [],
  currentVideoId: 0,
  currentVideoName: ""
}

function playlistReducer(state = initialState, action) {
  console.log("playlist reducer > ", action);
  
  switch(action.type){
    case PLAYLIST_NEW_SET_SUCCEED: {
      return {...state, isSucceed: action.data}
    }

    case PLAYLIST_NEW_SET_FORM: {
      const newForm = {...state.form, [action.data.target]: action.data.value}
      const result = {...state, form: newForm}
      return result
    }

    case PLAYLIST_SET_ALL: {
      return {...state, playlists: action.data}
    }

    case PLAYLIST_SET_CURRENT: {
      return {
        ...state,
        currentPlaylistName: action.data.name,
        currentPlaylistId: action.data.id
      }
    }

    case PLAYLIST_SET_CONTENT: {
      return {
        ...state,
        currentPlaylistContents: action.data
      }
    }

    case PLAYLIST_SET_ALL_VIDEOS: {
      return {
        ...state,
        allVideos: action.data
      }
    }

    case PLAYLIST_NEW_CONTENT_FORM: {
      const newForm = {...state.addContentForm, [action.data.target]: action.data.value}
      const result = {...state, addContentForm: newForm}
      return result
    }

    default: return state
  }
}

export default playlistReducer