//import {HomePage} from './pages/home-page.jsx'
//import {AboutUs} from './pages/about-us.jsx'
//import {CarApp} from './pages/car-app.jsx'

import { CreateStation } from "./pages/createStationPage";
import { Home } from "./pages/Home";
import { Queue } from "./pages/queue";
import { Search } from "./pages/search";
import { StationDetails } from "./pages/station-details";
import { Stations } from "./pages/stations";

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/station/:stationId',
        component: StationDetails,
    },
    {
        path: '/queue',
        component: Queue,
    }
    //{
    //    path:'/about',
    //    component: AboutUs,
    //}
    , {
        path: '/search',
        component: Search,
    },
    {
        path: '/stations',
        component: Stations
    },
    //{
    //    path: '/createStation',
    //    component: CreateStation
    //},


]

export default routes;