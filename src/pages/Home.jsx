import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { FavoriteArtists, RecentlyPlayed } from '../cmps/recently-played.jsx';

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';
import { loadUser } from '../store/user.actions';

class _Home extends Component {
    state = {
    }
    componentDidMount() {
        this.props.loadStations();
        this.props.loadUser();
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


    render() {
        const { stations, user } = this.props
        console.log(user);
        if (!stations && !this.props.user) return <h1>loading...</h1>
        return (

            <div className="home-page">
                <div className="hero">
                    <h1>Listen to your favorite music in <span className="logo"><span>Loti</span>fy</span></h1>
                </div>
                <section className='station-container'>
                    <MainLayout>
                        <h1>{this.getTime()}, {this.props.user.username}</h1>
                        <h3>Your favorite artists</h3>
                        {
                            user.userPref ?
                                <FavoriteArtists artists={user.userPref.slice(0, 4)} /> :
                                <FavoriteArtists artists={[{ artist: 'justin bieber', img: 'https://yt3.ggpht.com/ytc/AKedOLTKwkiuIDMtT7w-C55Q…-FxExhi3So7EWofYGuQ=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'ed sheeran', img: 'https://yt3.ggpht.com/2uiMtw7drxpcP4J7s61C0x1cK_fd…WYN2I8QneubJAA8J_Fo=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'billie eilish', img: 'https://yt3.ggpht.com/ytc/AKedOLTAirqzFYUbcrpr8K0B…DCZvBopbEb3K9klVNBA=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'michael jackson', img: 'https://yt3.ggpht.com/ytc/AKedOLRKkpURBGspdclOcPs6…Ds0S6VEIWIImSCQ63iA=s800-c-k-c0xffffffff-no-rj-mo' }]} />
                        }
                        <div className='playlist-container flex'>

                            <h3>Rock Music</h3>
                            <div className="flex genre">
                                {stations.map((station => <StationPreview key={station._id} station={station} />))}
                            </div>
                        </div>

                        <div className='playlist-container flex'>
                            <h3>Alternative Music</h3>
                            <div className="flex genre">

                                {stations.map((station => <StationPreview key={station._id} station={station} />))}
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