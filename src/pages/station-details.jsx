import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TrackPreview } from '../cmps/track-preview.jsx';
import { stationService } from '../services/async-storage.service.js';
import { setCurrTrack,addToQueue } from '../store/station.actions.js';

class _StationDetails extends Component {
    state = {
        station: null,
    }
    async componentDidMount() {
        const { stationId } = this.props.match.params
        const station = await stationService.getStationById(stationId)
        console.log(station);
        this.setState({ station })
    }

    playTrack=(track)=>{
        console.log('here');
        this.props.setCurrTrack(track);
        this.props.addToQueue(this.state.station.songs)
    }

    componentDidUpdate(){
        console.log(this.props.currIdx,this.props.queue);
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
                        {station.songs.map((track, idx) => <TrackPreview track={track} idx={idx} playTrack={this.playTrack}/>)}
                    </tbody>
                </table>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        currIdx: state.stationMoudle.currIdx,
        queue: state.stationMoudle.queue
    }
}
const mapDispatchToProps = {
    setCurrTrack,
    addToQueue
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)