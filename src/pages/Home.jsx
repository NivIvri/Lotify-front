import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { FavoriteArtists } from '../cmps/favorite-artists.jsx';

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';
import { loadUser } from '../store/user.actions';
import { stationService } from '../services/async-storage.service.js';
import { stationServiceNew } from '../services/station.service.js';

class _Home extends Component {
    state = {
        likedStations: ''
    }
    async componentDidMount() {
        await this.props.loadStations();
        await this.props.loadUser();
        await this.getLikedStation()
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

        let unresolvedPromises = await this.props.user.likedStations.map((stationId => {
            return stationServiceNew.getStationById(stationId);
        }
        ))

        const results = await Promise.all(unresolvedPromises);
        console.log(results, 'likedStations');
        this.setState({ likedStations: results })
        results.map(station => console.log(station, 'dfdsf'))
        { this.props.stations.map((station => console.log(station, 'station'))) }

        //this.props.user.likedStations.map((station => <StationPreview key={station._id} station={station} />))
    }

    render() {
        let { stations, user } = this.props
        stations = stations.filter(station => station._id !== 'likedTracks')
        const { likedStations } = this.state
        if (!stations && !this.props.user && !likedStations) return <h1>loading...</h1>
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
                                {stations.map((station => <StationPreview key={station._id} station={station} />))}
                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-header'>
                                <h3>Alternative Music</h3>
                            </div>
                            <div className="flex genre">

                                {stations.map((station => <StationPreview key={station._id} station={station} />)).slice(0, 5)}
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Liked station</h3>
                            </div>
                            <div className="flex genre">
                                {likedStations &&
                                    likedStations.map((station => <StationPreview key={station._id} station={station} />)).slice(0, 5)}
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


