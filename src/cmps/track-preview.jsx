import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { stationService } from '../services/async-storage.service';
import { eventBusService } from '../services/event-bus.service';
import { loadStations, addToNextQueue, setCurrTrack, setQueue } from '../store/station.actions.js';


class _TrackPreview extends Component {
    componentDidMount = () => {
        //to get Stations from store to the AddToPlaylist render
        this.props.loadStations()
    }

    getTimeFromDuration = (duration) => {
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
        duration = duration.replace('PT', '');
        if (duration.indexOf('H') > -1) {
            var hours_split = duration.split('H');
            hours = parseInt(hours_split[0]);
            duration = hours_split[1];
        }
        if (duration.indexOf('M') > -1) {
            var minutes_split = duration.split('M');
            minutes = parseInt(minutes_split[0]);
            duration = minutes_split[1];
        }
        if (duration.indexOf('S') > -1) {
            var seconds_split = duration.split('S');
            seconds = parseInt(seconds_split[0]);
        }
        var str = "";
        if (hours != 0) { str += hours + ":"; }
        if (minutes == 0) { str += "00" + ":"; }
        else if (minutes < 10) { str += "0" + minutes + ":"; }
        else if (minutes > 10) { str += minutes + ":"; }
        else if (minutes == 0) { str += "00:" }
        if (seconds > 0 && seconds < 10) { str += "0" + seconds; }
        else if (seconds < 10) { str += "0" + seconds; }
        else if (seconds > 10) { str += seconds; }
        else if (seconds == 0) { str += "00" }
        return str;
    }

    onAddToStation = async (track, stationId) => {
        await stationService.addToStation(track, stationId)
        if (this.props.currStation) {
            this.props.loadStation()
        }
    }

    onRemoveFromStation = async (track, stationId) => {
        await stationService.removeFromStation(track, stationId)
        if (this.props.currStation) {
            this.props.loadStation()
        }
    }

    playTrack = async (track, idx) => {
        const { currStation, queue, currTrack } = this.props
        let songs
        if (currStation) {//from station
            songs = [...currStation.songs];
        } else {
            if (queue.length && queue.some(trackFromQueue => track.id === trackFromQueue.id)) {//From Queue
                songs = [...queue, currTrack]
            } else {//from search
                songs = [track]
            }
        }
        this.props.setCurrTrack(track, idx);
        this.props.setQueue(songs, idx)
    }

    render() {
        const { track, idx, currStation, stations } = this.props
        return (
            <tr className="song-container" onClick={() => this.playTrack(track, idx)}>
                <td className='song-num'>{idx + 1}</td>
                <td><img src={track.imgUrl} alt="" /></td>
                <td>{track.title}</td>
                <td>{this.getTimeFromDuration(track.duration)}</td>
                <td className="button-cell" onClick={(ev) => { ev.stopPropagation() }}>
                    <Menu menuButton={
                        <MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
                        <MenuItem onClick={() => this.props.addToNextQueue(track)}>Add To queue</MenuItem>
                        {currStation && <MenuItem onClick={() => {
                            this.onRemoveFromStation(track, currStation._id)
                        }
                        }>Remove from station</MenuItem>}
                        <SubMenu label="Add to playlist">
                            {stations.map((station) => {
                                return (<MenuItem onClick={() => { this.onAddToStation(track, station._id) }}>{station.name}</MenuItem>)
                            })
                            }
                            <MenuItem onClick={() => eventBusService.emit("create-playlist")}>Create playlist</MenuItem>
                        </SubMenu>
                    </Menu>
                </td>
            </tr>
        )
    }
}



function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        queue: state.stationMoudle.queue,
        currTrack: state.stationMoudle.currTrack
    }
}
const mapDispatchToProps = {
    loadStations,
    addToNextQueue,
    setCurrTrack,
    setQueue
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)