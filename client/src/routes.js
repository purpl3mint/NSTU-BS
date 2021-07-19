import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage"
import { CabinetPage } from "./pages/CabinetPage"
import { DeviceGroupsPage } from "./pages/DeviceGroupsPage"
import { PlaylistsPage } from "./pages/PlaylistsPage"
import { SchedulesPage } from "./pages/SchedulesPage"
import { UserGroupsPage } from "./pages/UserGroupsPage"
import { VideosPage } from "./pages/VideosPage"

export const useRoutes = isAutheticated => {
    if (isAutheticated) {
        return (
            <Switch>
                <Route path="/" exact>
                    <CabinetPage />
                </Route>
                <Route path="/videos" exact>
                    <VideosPage />
                </Route>
                <Route path="/playlists" exact>
                    <PlaylistsPage />
                </Route>
                <Route path="/schedules" exact>
                    <SchedulesPage />
                </Route>
                <Route path="/devicegroups" exact>
                    <DeviceGroupsPage />
                </Route>
                <Route path="/usergroups" exact>
                    <UserGroupsPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}