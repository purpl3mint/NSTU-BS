import React, { useEffect, useState, useCallback } from "react"
import ReactPlayer from "react-player"
import { useHttp } from "../../hooks/http.hook"
import { useParams } from "react-router"

export const WatchPage = (props) => {

  let proxy = window.location.origin + ':80/stat/';
  if (process.env.NODE_ENV === 'development'){
      proxy = "http://localhost:5000/stat/"
  }

  const plug = 'plug.mp4'
  const { link } = useParams()
  const {request} = useHttp()
  const [currentVideo, setCurrentVideo] = useState(0)
  const [playlist, setPlaylist] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [timeEnd, setTimeEnd] = useState(null)

  
  const initHandler = useCallback( async () => {
    try {
      setIsLoaded(false)

      const data = await request('/api/playlist/contentlink/' + link, 'GET')

      if (data && data.content) {
        const links = data.content.map(v => v.content.source === 'static' ? proxy + v.content.link : v.content.link)

        const timeEnd = new Date(data.timeEnd)

        setPlaylist(links)
        setTimeEnd(timeEnd)
        setIsLoaded(true)
      } else {
        const links = [proxy + plug];
        const timeEnd = new Date(data.timeEnd)
        setPlaylist(links)
        setTimeEnd(timeEnd)
        setIsLoaded(true)
      }
    } catch (e) {}
  }, [request, link])

  const endVideoHandler = () => {
    const now = new Date()
    if (timeEnd < now)
      initHandler()
    else {

      if (playlist.length === 1) {
        setIsLoaded(false)
        setIsLoaded(true)
      } else 
        (currentVideo + 1) === playlist.length ? setCurrentVideo(0) : setCurrentVideo(currentVideo + 1)
    }
  }

  useEffect( () => { initHandler() }, [initHandler])

  return (
    <div className='player-wrapper' style={
        {
          position: "absolute", 
          top: '0px', 
          left: '0px', 
          right: '0px', 
          bottom: '0px',
          backgroundColor: 'rgb(66,66,66)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    >
      {isLoaded &&
      <ReactPlayer 
        url={playlist[currentVideo]} 
        playing='true'
        controls='true'
        width='100vw'
        height='100vh'
        onEnded={endVideoHandler}
      />}
      {!isLoaded && 
      <span>????????????????...</span>}
    </div>

  )
}