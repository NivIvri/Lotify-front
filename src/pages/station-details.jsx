import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TrackPreview } from '../cmps/track-preview.jsx';
import { TrackList } from '../cmps/trackList.jsx';
import { stationService } from '../services/async-storage.service.js';
import { setCurrTrack, addToNextQueue, setQueue, playNextTrack } from '../store/station.actions.js';

class _StationDetails extends Component {
    state = {
        stationId: null,
        station: null,
    }
    async componentDidMount() {
        document.body.style.backgroundImage = 'linear-gradient(#0F2C43, #121212)';
        this.loadStation()
    }

    loadStation = async () => {
        const { stationId } = this.props.match.params
        const station = await stationService.getStationById(stationId)
        this.setState({ station, stationId })
    }

    playTrack = async (track, idx) => {
        const songs = [...this.state.station.songs];
        this.props.setCurrTrack(track, idx);
        this.props.setQueue(songs, idx)
    }

    componentDidUpdate() {
        const { stationId } = this.props.match.params
        if (stationId !== this.state.station._id)
            this.loadStation()
    }


    // async componentDidUpdate() {
    //     const stationId = this.props.match.params.stationId
    //     if (stationId !== this.state.stationId) {
    //         const station = await stationService.getStationById(stationId)
    //         this.setState({ station, stationId })
    //     }
    //     console.log(this.props.playNextQueue);
    // }

    onAddToNextQueue = (track) => {
        this.props.addToNextQueue(track)
    }

    render() {
        const { station } = this.state
        if (!station) return <h1>loading...</h1>
        return (
            <section className='station-details'>


                <div className="station-head flex">
                    <img src={station.songs[0].imgUrl} alt="" />
                    <div className="title-details">
                        <p>Playlist</p>
                        <h1>{station.name}</h1>
                        <ul className="clean-list flex">
                            <li>{station.createdBy.fullname}</li>,
                            <li>{station.songs.length} songs</li>
                        </ul>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>◷</th>
                        </tr>
                        <TrackList songs={station.songs} playTrack={this.playTrack} onAddToNextQueue={this.onAddToNextQueue} />
                    </tbody>
                </table>
            </section>
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
    addToNextQueue,
    setQueue
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)