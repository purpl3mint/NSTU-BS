import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import { Sidebar } from "./components/Sidebar"
import { AuthPage } from "./pages/Auth/AuthPage"
import { CabinetPage } from "./pages/Cabinet/CabinetPage"
import { DeviceGroupsPage } from "./pages/DeviceGroup/DeviceGroupsPage"
import { DeviceGroupAddPage } from "./pages/DeviceGroup/DeviceGroupAddPage"
import { PlaylistsPage } from "./pages/Playlist/PlaylistsPage"
import { PlaylistPage } from "./pages/Playlist/PlaylistPage"
import { PlaylistAddPage } from "./pages/Playlist/PlaylistAddPage"
import { PlaylistAddContentPage } from "./pages/Playlist/PlaylistAddContentPage"
import { SchedulesPage } from "./pages/Schedule/SchedulesPage"
import { ScheduleAddPage } from "./pages/Schedule/ScheduleAddPage"
import { UserGroupsPage } from "./pages/UserGroup/UserGroupsPage"
import { UserGroupAddPage } from "./pages/UserGroup/UserGroupAddPage"
import { VideosPage } from "./pages/Video/VideosPage"
import { VideoPage } from "./pages/Video/VideoPage"
import { VideoAddPage } from "./pages/Video/VideoAddPage"
import { UsersPage } from "./pages/User/UsersPage"
import { UserAddPage } from "./pages/User/UserAddPage"

export const useRoutes = isAutheticated => {
    if (isAutheticated) {
        return (
            <div className="row">
                <Sidebar />

                <div className="col s9 m9 l9 xl9">
                    <Switch>
                        <Route path="/" exact>
                            <CabinetPage />
                        </Route>
                        <Route path="/videos" exact>
                            <VideosPage />
                        </Route>
                        <Route path="/video/add" exact>
                            <VideoAddPage />
                        </Route>
                        <Route path="/video/:id" exact>
                            <VideoPage />
                        </Route>
                        <Route path="/playlists" exact>
                            <PlaylistsPage />
                        </Route>
                        <Route path="/playlists/:id" exact>
                            <PlaylistPage />
                        </Route>
                        <Route path="/playlist/addcontent/:id" exact>
                            <PlaylistAddContentPage />
                        </Route>
                        <Route path="/playlist/add" exact>
                            <PlaylistAddPage />
                        </Route>
                        <Route path="/schedules" exact>
                            <SchedulesPage />
                        </Route>
                        <Route path="/schedule/add" exact>
                            <ScheduleAddPage />
                        </Route>
                        <Route path="/devicegroups" exact>
                            <DeviceGroupsPage />
                        </Route>
                        <Route path="/devicegroup/add" exact>
                            <DeviceGroupAddPage />
                        </Route>
                        <Route path="/usergroups" exact>
                            <UserGroupsPage />
                        </Route>
                        <Route path="/usergroup/add" exact>
                            <UserGroupAddPage />
                        </Route>
                        <Route path="/users" exact>
                            <UsersPage />
                        </Route>
                        <Route path="/user/add" exact>
                            <UserAddPage />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
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