//import {HomePage} from './pages/home-page.jsx'
//import {AboutUs} from './pages/about-us.jsx'
//import {CarApp} from './pages/car-app.jsx'

import { Home } from "./pages/home";
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
        path: '/search',
        component: StationDetails,
    },
    {
        path: '/stations',
        component: Stations
    },


]

export default routes;