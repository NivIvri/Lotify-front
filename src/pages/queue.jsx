import React from 'react'
import { StationDetails } from './station-details'
import { connect } from 'react-redux'
import { TrackList } from '../cmps/trackList'
import { setCurrTrack } from '../store/station.actions.js';
import { TrackPreview } from '../cmps/track-preview';

class _Queue extends React.Component {
    componentDidMount() {
        console.log('hererer');
        document.body.style.backgroundImage = ' linear-gradient(#03080d, #121212)'
    }

    onAddToQueue=(track)=>{
        this.props.addToQueue(track)
    }
    render() {
        const songs = this.props.queue
        if (!songs.length) return <div>queue is empty</div>
        console.log(this.props.playNextQueue,'playNextQueue');
        return (
            <div className='queue-contaier'>
                <table>
                    <thead>
                        <th colSpan='3'>Queue</th>
                    </thead>
                    <tbody>
                        <tr><td colSpan='3'>Now Playing</td> </tr>
                        <TrackPreview track={this.props.currTrack} idx={0} playTrack={() => { }} />
                        <tr><td colSpan='3'>Play Next Queue</td> </tr>
                        <TrackList songs={this.props.playNextQueue} onAddToQueue={this.onAddToQueue}  idx={0} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx,true) }} />
                        <tr><td colSpan='3'>QUEUE</td> </tr>
                        <TrackList songs={songs} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} onAddToQueue={this.onAddToQueue} />
                    </tbody>
                </table>

            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
        queue: state.stationMoudle.queue,
        playNextQueue: state.stationMoudle.playNextQueue
    }
}
const mapDispatchToProps = {
    setCurrTrack
}


export const Queue = connect(mapStateToProps, mapDispatchToProps)(_Queue)

