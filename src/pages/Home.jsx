import React, { Component } from 'react'
import { connect } from 'react-redux'

import { PlaylistPreview } from '../cmps/playlist.preview.jsx';
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
            <section className='station-container'>
                {stations.map((playlist => <PlaylistPreview key={playlist.id}playlist={playlist} />))}
            </section>
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