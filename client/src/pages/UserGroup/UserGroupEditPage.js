import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const UserGroupEditPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()

    return <div>
        <h1>Измененение группы устройств для группы модераторов</h1>

    </div>
}