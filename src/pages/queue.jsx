import React from 'react'
import { StationDetails } from './station-details'
import { connect } from 'react-redux'
import { TrackList } from '../cmps/trackList'
import { setCurrTrack, addToNextQueue } from '../store/station.actions.js';
import { TrackPreview } from '../cmps/track-preview';
import { Link } from 'react-router-dom'

class _Queue extends React.Component {
    componentDidMount() {
        document.body.style.backgroundImage = ' linear-gradient(#03080d, #121212)'
    }

    componentWillUnmount(){
        document.body.style.backgroundImage = 'linear-gradient(#0F2C43, #121212)';

    }

    onAddToNextQueue = (track) => {
        this.props.addToNextQueue(track)
    }
    render() {

        const songs = this.props.queue
        if (!songs.length) return <div><span>Add to your queue</span>
            <span>Tap "Add to queue" from a trackws menu to see it here</span>
            <Link to='/search'>
                <button>FIND SOMETHING TO PLAY</button>
            </Link>
        </div>
        console.log(this.props.playNextQueue, 'playNextQueue');
        return (
            <div className='queue-contaier'>
                <table>
                    <thead>
                        <th colSpan='3'>Queue</th>
                    </thead>
                    <tbody>
                        <tr><td colSpan='3'>Now Playing</td> </tr>
                        <TrackPreview track={this.props.currTrack} idx={0} playTrack={() => { }} onAddToNextQueue={this.onAddToNextQueue} />
                        <tr><td colSpan='3'>Play Next Queue</td> </tr>
                        <TrackList songs={this.props.playNextQueue} onAddToNextQueue={this.onAddToNextQueue} idx={0} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} />
                        <tr><td colSpan='3'>QUEUE</td> </tr>
                        <TrackList songs={songs} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} onAddToNextQueue={this.onAddToNextQueue} />
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
    setCurrTrack,
    addToNextQueue
}


export const Queue = connect(mapStateToProps, mapDispatchToProps)(_Queue)

