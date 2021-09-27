import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { RecentlyPlayed } from '../cmps/recently-played.jsx';

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';

class _Home extends Component {
    state = {
    }
    componentDidMount() {
        this.props.loadStations();
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
        const { stations } = this.props
        if (!stations) return <h1>loading...</h1>
        return (

            // <div className="home-page">
            //     <div className="hero">
            //         <h1>Listen to your favorite music in <span className="logo"><span>Music</span>fy</span></h1>
            //     </div>
            //     <section className='station-container'>
            //         <h3>{this.getTime()}</h3>
            //         <div className="home-recently flex">

            //             {stations.map((station => <StationPreview key={station._id} station={station} />))}

            //         </div>
            //         <h3>Rock Music</h3>
            //         <div className="rock flex">
            //             <section className='stationss-container card-grid'>
            //                 {stations.map((station => <StationPreview key={station._id} station={station} />))}
            //             </section>
            //         </div>
            //         <div className="flex">
            //             {stations.map((station => <StationPreview key={station._id} station={station} />))}
            //         </div>

            <div className="home-page">
                <div className="hero">
                    <h1>Listen to your favorite music in <span className="logo"><span>Loti</span>fy</span></h1>
                </div>
                <section className='station-container'>
                    <MainLayout>
                        <h3>{this.getTime()}</h3>
                        <RecentlyPlayed stations={stations} />
                        <h3>Rock Music</h3>
                        <div className="flex genre">
                            {stations.map((station => <StationPreview key={station._id} station={station} />))}
                        </div>
                        <h3>Alternative Music</h3>
                        <div className="flex genre">

                            {stations.map((station => <StationPreview key={station._id} station={station} />))}
                        </div>
                    </MainLayout>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations
    }
}
const mapDispatchToProps = {
    loadStations,
}


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)