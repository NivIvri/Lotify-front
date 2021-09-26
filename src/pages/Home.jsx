import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';

class _Home extends Component {
    state = {
    }
    componentDidMount() {
        this.props.loadStations();
    }


    render() {
        const { stations } = this.props
        if (!stations) return <h1>loading...</h1>
        return (
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