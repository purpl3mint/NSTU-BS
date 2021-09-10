import React, { useEffect, useState, useCallback } from "react"
import ReactPlayer from "react-player"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
const jwt = require('jsonwebtoken')

export const VideoPage = (props) => {
    const proxy = "http://localhost:5000/"
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [name, setName] = useState("")
    const [id, setId] = useState(0)
    const [link, setLink] = useState("")
    const [source, setSource] = useState("")
    const [isApproved, setIsApproved] = useState(false)
    const [token, setToken] = useState('')
    const [level, setLevel] = useState('')
    
    const getLink = useCallback( async() => {
        try {
            const data = await request("/api/content/" + id, "GET")
            if (data.source === "static") {
                setLink(proxy + data.link)
            } else {
                setLink(data.link)
            }
            setSource(data.source)
            setIsApproved(data.is_approved)
        } catch (e) {}
    }, [request, id, link])
    
    const approvingHandler = useCallback( async () => {
        try {
            const data = await request("/api/content/approving", "PUT", {id: id})
            message(data.message)
            setIsApproved(data.isSucceed)
        } catch (e) {}
    }, [id, message, request])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("currentVideo"))

        if (data){
            if (data.name) {
                setName(data.name)
            }
            if (data.id) {
                setId(data.id)
            }
        }

        getLink()

        setToken(JSON.parse(localStorage.getItem('userData')).token)
        const dataToken = jwt.decode(token)

        if (dataToken) {
            setLevel(dataToken.level)
        } else {
            setLevel('неизвестно')
        }
    }, [id, name, getLink, token])



    return (
        <div className="row" style={{ marginTop: "10px"}}>
            <ReactPlayer url={link} controls='true'/>
            <h3 className="video-tltle">{name}</h3>
            {!isApproved && 
            <div 
                class="approving-container" 
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
            class="approving-container" 
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