import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';

class _Home extends Component {
    state = {
    }
    componentDidMount() {
        this.props.loadStations();
<<<<<<< HEAD
=======
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
>>>>>>> 25df4b410da720e3e1fa17b3ca6503c9e9a07a8d
    }


    render() {
        const { stations } = this.props
        if (!stations) return <h1>loading...</h1>
        return (
<<<<<<< HEAD
            // <section className='station-container'>
            <div className="stations-container">
                <section className='stationss-container card-grid'>
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                </section>
=======
            <div className="home-page">
            <div className="hero">
                    <h1>Listen to your favorite music in <span className="logo"><span>Music</span>fy</span></h1>
                </div>
                    <section className='station-container'>
                    <h3>{this.getTime()}</h3>
                <div className="home-recently flex">
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                </div>
                    <h3>Rock Music</h3>
                <div className="rock flex">
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                </div>
                <div className="flex">
                    {stations.map((station => <StationPreview key={station._id} station={station} />))}
                </div>
            </section>
>>>>>>> 25df4b410da720e3e1fa17b3ca6503c9e9a07a8d
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