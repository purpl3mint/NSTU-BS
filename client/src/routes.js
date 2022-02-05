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
import { ScheduleEditPage } from "./pages/Schedule/ScheduleEditPage"
import { UserGroupsPage } from "./pages/UserGroup/UserGroupsPage"
import { UserGroupAddPage } from "./pages/UserGroup/UserGroupAddPage"
import { VideosPage } from "./pages/Video/VideosPage"
import { VideoPage } from "./pages/Video/VideoPage"
import { VideoAddPage } from "./pages/Video/VideoAddPage"
import { UsersPage } from "./pages/User/UsersPage"
import { UserAddPage } from "./pages/User/UserAddPage"
import { UserSetGroupPage } from "./pages/User/UserSetGroupPage"
import { WatchPage } from "./pages/Watch/WatchPage"

export const useRoutes = isAutheticated => {
    let routesList = [
        {comp:<CabinetPage />,               path:"/",                           exact:true,  auth:true},
        {comp:<CabinetPage />,               path:"/",                           exact:true,  auth:true},
        {comp:<VideosPage />,                path:"/videos",                     exact:true,  auth:true},
        {comp:<VideoAddPage />,              path:"/video/add",                  exact:true,  auth:true},
        {comp:<VideoPage />,                 path:"/video/:id",                  exact:true,  auth:true},
        {comp:<PlaylistsPage />,             path:"/playlists",                  exact:true,  auth:true},
        {comp:<PlaylistPage />,              path:"/playlists/:id",              exact:true,  auth:true},
        {comp:<PlaylistAddContentPage />,    path:"/playlist/addcontent/:id",    exact:true,  auth:true},
        {comp:<PlaylistAddPage />,           path:"/playlist/add",               exact:true,  auth:true},
        {comp:<SchedulesPage />,             path:"/schedules",                  exact:true,  auth:true},
        {comp:<ScheduleAddPage />,           path:"/schedule/add",               exact:true,  auth:true},
        {comp:<ScheduleEditPage />,          path:"/schedule/edit/:id",          exact:true,  auth:true},
        {comp:<DeviceGroupsPage />,          path:"/devicegroups",               exact:true,  auth:true},
        {comp:<DeviceGroupAddPage />,        path:"/devicegroup/add",            exact:true,  auth:true},
        {comp:<UserGroupsPage />,            path:"/usergroups",                 exact:true,  auth:true},
        {comp:<UserGroupAddPage />,          path:"/usergroup/add",              exact:true,  auth:true},
        {comp:<UsersPage />,                 path:"/users",                      exact:true,  auth:true},
        {comp:<UserAddPage />,               path:"/user/add",                   exact:true,  auth:true},
        {comp:<UserSetGroupPage />,          path:"/user/edit/:id",              exact:true,  auth:true},
        {comp:<WatchPage />,                 path:"/watch/:link",                exact:true,  auth:false},
        {comp:<AuthPage />,                  path:"/",                           exact:true,  auth:false}
    ]

    let routesDisplay = routesList.map(r => {
        if ((isAutheticated && r.auth) || !r.auth)
            if (r.exact)
                return <Route path={r.path} exact>{r.comp}</Route>
            else
                return <Route path={r.path}>{r.comp}</Route>
    })

    return (
        <div className="row">
            {isAutheticated && <Sidebar /> }
            
            <div className="col s9 m9 l9 xl9">
                <Switch>
                    { routesDisplay }
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    )
}