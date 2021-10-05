import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { FavoriteArtists } from '../cmps/favorite-artists.jsx';

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';
import { loadUser } from '../store/user.actions';
import { stationServiceNew } from '../services/station.service.js';

class _Home extends Component {
    state = {
        likedStations: '',
        recentlyPlayedStations: '',
        numOfPreviews: 5
    }

    resizer
    handleRisize = (entries) => {
        const viewPortWidth = entries[0].contentRect.width
        if (viewPortWidth >= 2010)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 8 }))
        if (viewPortWidth >= 1800)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 7 }))
        else if (viewPortWidth >= 1590)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 6 }))
        else if (viewPortWidth >= 1380)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 5 }))
        else if (viewPortWidth >= 1170)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 4 }))
        else if (viewPortWidth >= 962)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 3 }))
        else if (viewPortWidth >= 762)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 2 }))
        else if (viewPortWidth >= 562)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 1 }))

    }
    async componentDidMount() {
        await this.props.loadStations();
        await this.props.loadUser();
        await this.getLikedStation()
        this.resizer = new ResizeObserver(this.handleRisize)
        this.resizer.observe(document.querySelector('.main-app'))
    }

    getTime = () => {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            return 'Good morning'
        } else if (curHr < 18) {
            return 'Good afternoon'
        } else {
            return 'Good evening'
        }
    }
    getLikedStation = async () => {
        debugger
        let unresolvedPromisesLike = await this.props.user.likedStations.map((stationId => {
            return stationServiceNew.getStationById(stationId);
        }
        ))
        let unresolvedPromisesStation = await this.props.user.recentlyPlayedStations.map((stationId => {
            return stationServiceNew.getStationById(stationId);
        }
        ))
        let b =await Promise.all(unresolvedPromisesStation)
        let a = await Promise.all(unresolvedPromisesLike)
        const results = await Promise.all([a, b]);
        debugger
        this.setState({ likedStations: results[0], recentlyPlayedStations: results[1] })
        //this.props.user.likedStations.map((station => <StationPreview key={station._id} station={station} />))
    }

    render() {
        let { stations, user } = this.props
        stations = stations.filter(station => station._id !== 'likedTracks')
        const { likedStations, numOfPreviews, recentlyPlayedStations } = this.state
        console.log('numOfPreviews', numOfPreviews);
        if (!stations && !this.props.user && !likedStations && !recentlyPlayedStations) return <h1>loading...</h1>
        return (

            <div className="home-page">
                <div class="shadow">

                    <div className="hero">
                        <h1>Listen to your favorite music on <span className="logo">Lotify<span>.</span></span></h1>
                    </div>
                </div>
                <section className='station-container'>
                    <div className='card card-top'>
                        <div className='card-header'>
                            <h1>{this.getTime()}</h1>
                        </div>
                        {
                            user.userPref ?
                                <FavoriteArtists artists={user.userPref.slice(0, 4)} /> :
                                <FavoriteArtists artists={[{ artist: 'justin bieber', img: 'https://yt3.ggpht.com/ytc/AKedOLTKwkiuIDMtT7w-C55QJm3-FxExhi3So7EWofYGuQ=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'ed sheeran', img: 'https://yt3.ggpht.com/2uiMtw7drxpcP4J7s61C0x1cK_fdX0Fp_RJ9t9l-RVnal24xyqSLPhIkWYN2I8QneubJAA8J_Fo=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'billie eilish', img: 'https://yt3.ggpht.com/ytc/AKedOLTAirqzFYUbcrpr8K0Bh8iDCZvBopbEb3K9klVNBA=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'michael jackson', img: 'https://yt3.ggpht.com/ytc/AKedOLRKkpURBGspdclOcPs6lr2Ds0S6VEIWIImSCQ63iA=s800-c-k-c0xffffffff-no-rj-mo' }]} />
                        }                        </div>
                    <MainLayout>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Rock Music</h3>
                            </div>
                            <div className="flex genre">
                                {/* {stations.map((station => <StationPreview key={station._id} station={station} />)).slice(0, 5)} */}
                                {stations.map((station => <StationPreview key={station._id}
                                    station={station} />)).slice(0, Math.min(stations.length, numOfPreviews))}
                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-header'>
                                <h3>Alternative Music</h3>
                            </div>
                            <div className="flex genre">

                                {stations.map((station => <StationPreview key={station._id}
                                    station={station} />)).slice(0, Math.min(stations.length, numOfPreviews))}
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Stations you liked</h3>
                            </div>
                            <div className="flex genre">
                                {likedStations &&
                                    likedStations.map((station => <StationPreview key={station._id}
                                        station={station} />)).slice(0, Math.min(stations.length, numOfPreviews))}
                                {/*{likedStations.map((station => <StationPreview key={station._id} station={station} />))}*/}
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Recently played</h3>
                            </div>
                            <div className="flex genre">
                                {recentlyPlayedStations &&
                                    recentlyPlayedStations.map((station => <StationPreview key={station._id}
                                        station={station} />)).slice(0, Math.min(stations.length, numOfPreviews))}
                                {/*{likedStations.map((station => <StationPreview key={station._id} station={station} />))}*/}
                            </div>
                        </div>
                    </MainLayout>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        user: state.userMoudle.user,

    }
}
const mapDispatchToProps = {
    loadStations,
    loadUser
}


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)


