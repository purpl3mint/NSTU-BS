import React from "react"
/*
import React, { useEffect, useState, useCallback } from "react"
import ReactPlayer from "react-player"
import { useHttp } from "../../hooks/http.hook"
*/

export const VideoPage = (props) => {
    /*
    const {loading, error, request, clearError} = useHttp()
    const [name, setName] = useState("")
    const [id, setId] = useState(0)
    const [link, setLink] = useState("")


    const getLink = useCallback( async() => {
        let newLink
        const data = await request("/api/content/" + id, "GET").then(result => 
            newLink = "http://localhost:5000/static/" + result.link
        )

        console.log(link);
        setLink(newLink)
    }, [request, id, link ])

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

        console.log(name, id);

        getLink()
    }, [id, name, getLink])

    */

    return (
        <div className="row">
            <h1 className="video-tltle">В разработке</h1>
        </div>
    )
}