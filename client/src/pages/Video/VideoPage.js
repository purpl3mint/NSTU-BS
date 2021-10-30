import React, { useEffect, useCallback } from "react"
import ReactPlayer from "react-player"
import { useDispatch, useSelector } from "react-redux"
import { videoSetApprovedVideo, videoGetApproved } from "../../store/actionCreators/videoActionCreator"

export const VideoPage = (props) => {
    const dispatch = useDispatch()

    const name = useSelector(state => state.videoReducer.currentVideo.name)
    const id = useSelector(state => state.videoReducer.currentVideo.id)
    const link = useSelector(state => state.videoReducer.currentVideo.link)
    const source = useSelector(state => state.videoReducer.currentVideo.source)
    const isApproved = useSelector(state => state.videoReducer.currentVideo.isApproved)
    
    const level = useSelector(state => state.videoReducer.userLevel)

    const approvingHandler = useCallback ( () => {
        const currentVideo = { id, name, link, source, isApproved }
        dispatch(videoSetApprovedVideo(currentVideo))
    }, [dispatch, name, id, link, source, isApproved])

    const initializeHandler = useCallback( () => {
        dispatch(videoGetApproved(id))
    }, [dispatch, id])

    useEffect( () => { initializeHandler() }, [initializeHandler])

    return (
        <div className="row" style={{ marginTop: "10px"}}>
            <ReactPlayer url={link} controls={true}/>
            <h3 className="video-tltle">{name}</h3>
            {!isApproved && 
            <div 
                className="approving-container" 
                style={{display: "flex", flexDirection: "row"}}
            >
                <div 
                    className="approving-card" 
                    style={{
                        width: "120px", 
                        textAlign: "center", 
                        paddingTop: "5px", 
                        backgroundColor: "red",
                        marginRight: "20px"
                    }}
                >
                    Не одобрено
                </div>
                {   (level === 1 || level === 2) && 
                    <button className="approving-button btn" onClick={approvingHandler}>Одобрить</button>
                }
            </div>
            }

            {isApproved && 
            <div 
            className="approving-container" 
            style={{display: "flex", flexDirection: "row"}}
        >
            <div 
                className="approving-card" 
                style={{
                    width: "120px", 
                    textAlign: "center", 
                    paddingTop: "5px", 
                    paddingBottom: "5px", 
                    backgroundColor: "green",
                    marginRight: "20px",
                    color: "white"
                }}
            >
                Одобрено
            </div>
        </div>}
        </div>
    )
}