import React from 'react'
import { Switch, Route } from 'react-router'
import { MainNav } from './cmps/main-nav.jsx'
import routes from './routes.js'
import { AppFooter } from './cmps/app-footer.jsx'
import { CreateStation } from './cmps/create-playlist.jsx'
import { UserMsg } from './cmps/user-msg.jsx'

export class RootCmp extends React.Component {

    render() {
        return (
            <main className="main-app">
                <CreateStation />
                <MainNav />

                <Switch>
                    {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                </Switch>
                <UserMsg />
                <AppFooter />

            </main>


            // <div>
            // <main className="flex">
            //     <CreateStation />
            //    <MainNav />

            //     <Switch>
            //         {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
            //     </Switch>

            // </main>
            //     <AppFooter />
            // </div>
        )
    }
}


