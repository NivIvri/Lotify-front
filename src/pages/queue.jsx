import React from 'react'
import { StationDetails } from './station-details'
import { connect } from 'react-redux'
import { TrackList } from '../cmps/trackList'
import { setCurrTrack } from '../store/station.actions.js';
import { TrackPreview } from '../cmps/track-preview';

class _Queue extends React.Component {
    render() {
        const songs = this.props.queue
        if (!songs.length) return <div>queue is empty</div>
        return (
            <div className='queue-contaier'>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr><td>Now Playing</td> </tr>
                        <TrackPreview track={this.props.currTrack} idx={0} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} />
                        <tr><td>Next in QUEUE</td> </tr>
                        <TrackList songs={songs} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} />
                    </tbody>
                </table>

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

