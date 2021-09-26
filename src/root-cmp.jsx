import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router'
import { MainNav } from './cmps/main-nav.jsx'
import routes from './routes.js'

//import {AppHeader} from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { LoginNav } from './cmps/login-nav.jsx'
import { NavItem } from './cmps/nav-item.jsx'
import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
import { ReactComponent as ChevronIcon } from './icons/chevron.svg'
import { ReactComponent as CaretIcon } from './icons/caret.svg'
import { ReactComponent as CogIcon } from './icons/cog.svg'
import { DropdownMenu } from './cmps/dropdown-menu.jsx'
// import { ReactComponent as ArrowIcon } from './icons/arrow.svg'
// import { ReactComponent as ArrowIcon } from './icons/arrow.svg'

export class RootCmp extends React.Component {

    render() {
        return (
            <div>
                {/*<AppHeader />*/}
                <main className="flex">
                    {/* <LoginNav> */}
                    {/* <NavItem icon={<ArrowIcon />}></NavItem>
                        <NavItem icon={<ChevronIcon />}></NavItem> */}
                    {/* <NavItem icon={<CaretIcon />}>
                            <DropdownMenu></DropdownMenu>
                        </NavItem> */}
                    {/* <NavItem icon={<CogIcon />}></NavItem> */}
                    {/* <NavItem icon="😀"></NavItem> */}
                    {/* </LoginNav> */}
                    <MainNav />

                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>

                </main>
                <AppFooter />
            </div>
        )
    }
}


