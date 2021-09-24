import React from 'react'
import { StationDetails } from './station-details'
import { connect } from 'react-redux'
import { TrackList } from '../cmps/trackList'
import { setCurrTrack } from '../store/station.actions.js';

class  _Queue extends React.Component {
    render() {
        return (
            <div>
                <TrackList songs={this.props.queue} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} />
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
        queue: state.stationMoudle.queue
    }
}
const mapDispatchToProps = {
    setCurrTrack
}


export const Queue = connect(mapStateToProps, mapDispatchToProps)(_Queue)

