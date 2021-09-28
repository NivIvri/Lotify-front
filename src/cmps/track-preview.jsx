import { connect } from 'react-redux'
import React, { Component } from 'react'
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { stationService } from '../services/async-storage.service';
import { eventBusService } from '../services/event-bus.service';
import { render } from '@testing-library/react';
import { loadStations,addToNextQueue } from '../store/station.actions.js';


class _TrackPreview extends Component {
    componentDidMount=()=>{
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
    onAddToStation = async (track, stationId, isRemove = false) => {
        if (!isRemove) {
            debugger
            await stationService.addToStation(track, stationId)
           this.props.loadStations()
        } else {
            await stationService.removeFromStation(track, stationId)
           this.props.loadStations()
        }
    }
    // ({ track, idx, playTrack, onAddToNextQueue, stations, currStation, onAddToStation })
    render() {
        const {track,idx,playTrack,currStation,stations}=this.props
        return (
            <tr className="song-container" onClick={() => playTrack(track, idx)}>
                <td className='song-num'>{idx + 1}</td>
                <td><img src={track.imgUrl} alt="" /></td>
                <td>{track.title}</td>
                <td>{this.getTimeFromDuration(track.duration)}</td>
                <td className="button-cell" onClick={(ev) => { ev.stopPropagation() }}>
                    <Menu menuButton={<MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
                        <MenuItem onClick={() => this.props.addToNextQueue(track)}>Add To queue</MenuItem>
                        {currStation && <MenuItem onClick={() => this.onAddToStation(track, currStation._id, true)}>Remove from station</MenuItem>}
                        <SubMenu label="Add to playlist">
                            {stations.map((station) => {
                                debugger
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
        stations: state.stationMoudle.stations
    }
}
const mapDispatchToProps = {
    loadStations,
    addToNextQueue
}


export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)