import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TrackPreview } from '../cmps/track-preview.jsx';
import { TrackList } from '../cmps/trackList.jsx';
import { stationService } from '../services/async-storage.service.js';
import { setCurrTrack, addToQueue, playNextTrack, playPrevTrack, shuffleQueue } from '../store/station.actions.js';

class _StationDetails extends Component {
    state = {
        station: null,
    }
    async componentDidMount() {
        const stationId = this.props.match.params.stationId
        const station = await stationService.getStationById(stationId)
        this.setState({ station })
    }

    playTrack = async (track, idx) => {
        const songs = [...this.state.station.songs];
        this.props.setCurrTrack(track, idx);
        this.props.addToQueue(songs, idx)
    }

    componentDidUpdate() {
        console.log(this.props.currTrack, this.props.queue);
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
                        <TrackList songs={station.songs} playTrack={this.playTrack} />
                        {/*{station.songs.map((track, idx) => <TrackPreview track={track} idx={idx} playTrack={this.playTrack} />)}*/}
                    </tbody>
                </table>
                <button onClick={this.goNext}>Shuffle</button>
            </section>
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
    setCurrTrack,
    addToQueue,
    playNextTrack,
    playPrevTrack,
    shuffleQueue
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)