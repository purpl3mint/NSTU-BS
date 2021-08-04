import React, { useEffect, useState, useCallback } from "react"
import ReactPlayer from "react-player"
import { useHttp } from "../../hooks/http.hook"

export const VideoPage = (props) => {
    const {loading, error, request, clearError} = useHttp()
    const [name, setName] = useState("")
    const [id, setId] = useState(0)
    const [link, setLink] = useState("")

    
    const getLink = useCallback( async() => {
        try {
            const data = await request("/api/content/" + id, "GET")
            setLink(data.link)
            console.log(link);
        } catch (e) {}
    }, [request, id, link])
    

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
    }, [id, name, getLink])



    return (
        <div className="row">
            <h1 className="video-tltle">{name}</h1>
            <ReactPlayer url={link}/>
        </div>
    )
}