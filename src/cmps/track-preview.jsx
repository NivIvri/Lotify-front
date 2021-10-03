// import { connect } from 'react-redux'
// import React, { Component } from 'react'
// import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
// import '@szhsin/react-menu/dist/index.css';
// import '@szhsin/react-menu/dist/transitions/slide.css';
// import { stationService } from '../services/async-storage.service';
// import { eventBusService } from '../services/event-bus.service';
// import { loadStations, addToNextQueue, setCurrTrack, setQueue } from '../store/station.actions.js';
// import heartChecked from '../assets/img/heart-checked.png';
// import heartNotChecked from '../assets/img/heart-notCheck.png';

import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { stationService } from '../services/async-storage.service';
import { eventBusService } from '../services/event-bus.service';
import { loadStations, addToNextQueue, setCurrTrack, setQueue } from '../store/station.actions.js';
import { addLikeToTrack, loadUser, removeLikeFromTrack } from '../store/user.actions';
import heartNotChecked from '../assets/img/heart-regular.svg';
import isPlying from '../assets/img/isPlaying.gif'

class _TrackPreview extends Component {
    state = {
        isLike: false
    }

    componentDidMount = async () => {
        //to get Stations from store to the AddToPlaylist render
        await this.props.loadStations()
        let user = await this.props.user
        if (!user) {
            await this.props.loadUser();
            user = await this.props.user
        }
        //track save as object
        const trackIdxs = this.props.user.likedTracks.map(track => track.id)
        if (trackIdxs.includes(this.props.track.id)) {

            this.setState({ isLike: true })
        }

    }



    async componentDidUpdate(prevProps) {
        if ((prevProps.track.id !== this.props.track.id) || (this.props.user.likedTracks.length !== prevProps.user.likedTracks.length)) {
            await this.props.loadStations()
            let user = await this.props.user
            if (!user) {
                await this.props.loadUser();
                user = await this.props.user
            }
            const trackIdxs = this.props.user.likedTracks.map(track => track.id)
            if (trackIdxs.includes(this.props.track.id)) {
                this.setState({ isLike: true })
            }
            else this.setState({ isLike: false })
        }
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

    onAddToStation = async (track, stationId = null) => {
        if (!stationId) {
            stationId = this.props.currStation
        }
        await stationService.addToStation(track, stationId)
        //if (this.props.currStation) {
        //}
    }

    onRemoveFromStation = async (track, stationId) => {
        await stationService.removeFromStation(track, stationId)
        if (this.props.currStation) {
            this.props.loadStation()
        }
    }

    playTrack = async (track, idx) => {
        const { currStation, queue, currTrack, playNextQueue } = this.props
        let songs
        if (currStation) {//only if clicking on station details not from queue!
            songs = [...currStation.songs];
        } else {
            if (queue.length && queue.some(trackFromQueue => track.id === trackFromQueue.id)) {//From Queue
                songs = [...queue, currTrack]
            } else {//from search
                if (playNextQueue.length && playNextQueue.some(trackFromQueue => track.id === trackFromQueue.id)) {
                    songs = [...queue, currTrack]
                }
                else {
                    songs = [track]
                }
            }

        }
        this.props.setCurrTrack(track, idx);
        if (!track.nextQueue) {
            this.props.setQueue(songs, currStation?._id)
        }
    }

    toggleLike = async (ev) => {
        ev.stopPropagation()
        this.setState({ isLike: !this.state.isLike }, () => {
            if (this.state.isLike)
                this.props.addLikeToTrack(this.props.track, 'track')
            else {
                this.props.removeLikeFromTrack(this.props.track.id, 'track')
            }
        })
    }

    render() {
        const { track, idx, currStation, stations, user } = this.props
        console.log(this.state.isLike, 'this.stste.isLike');
        return (
            // onClick={this.playTrack(track, idx)}
            //button-cell
            <div className="track-container flex" onClick={() => this.playTrack(track, idx)}>
                {this.props.currTrack && this.props.currTrack?.id === track.id && this.props.isPlaying &&
                    <div className="track-num"> < img className='isPlaying' src={isPlying} /></div>
                }
                {(!this.props.currTrack || this.props.currTrack.id !== track.id || !this.props.isPlaying) &&
                    <div className="track-num">{idx + 1}</div>}
                <div className="track-img"><img src={track.imgUrl} alt="" /></div>
                <div className="track-title">{track.title}</div>
                <div className="track-duration">{this.getTimeFromDuration(track.duration)}</div>
                <div className='likes'>
                    {
                        //this.state.isLike && <img className='islike' src={heartChecked} onClick={(ev) => { this.toggleLike(ev) }} />
                        this.state.isLike && <span className='isLike' onClick={(ev) => { this.toggleLike(ev) }} class="fas fa-heart"></span>
                    }
                    {
                        !this.state.isLike && <img className='isnotLike' src={heartNotChecked} onClick={(ev) => { this.toggleLike(ev) }} />
                    }
                </div>
                {

                    !this.props?.isOnDeatils &&
                    <div className="button-cell track-actions" onClick={(ev) => { ev.stopPropagation() }}>
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
                                <MenuItem onClick={() => eventBusService.emit("create-playlist", track)}>Create playlist</MenuItem>
                            </SubMenu>
                        </Menu>
                    </div>
                }
                {
                    this.props?.isOnDeatils &&
                    <button className='add-track-btn' onClick={async (ev) => {
                        debugger
                        ev.stopPropagation()
                        await this.onAddToStation(track, this.props.stationId)
                        await this.props.loadStation()
                    }}>Add</button>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        queue: state.stationMoudle.queue,
        currTrack: state.stationMoudle.currTrack,
        playNextQueue: state.stationMoudle.playNextQueue,
        isPlaying: state.stationMoudle.isPlaying,
        user: state.userMoudle.user,

    }
}
const mapDispatchToProps = {
    loadStations,
    addToNextQueue,
    setCurrTrack,
    setQueue,
    addLikeToTrack,
    loadUser,
    removeLikeFromTrack
}

export const TrackPreview = connect(mapStateToProps, mapDispatchToProps)(_TrackPreview)