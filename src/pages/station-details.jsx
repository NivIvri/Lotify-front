import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { TrackList } from '../cmps/trackList.jsx';
import { stationService } from '../services/async-storage.service.js';
import { setCurrTrack, addToNextQueue, setQueue, loadStations, toggleIsPlaying } from '../store/station.actions.js';
import { addLikeToTrack, loadUser, removeLikeFromTrack } from '../store/user.actions';
import stationImg from '../assets/img/stationImg.jpg'
import { arrayMove } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import { DraggableTrackList } from '../cmps/draggable-track-list.jsx';
//import { DraggableTrackList } from '../cmps/draggable-track-list.jsx';
import heartNotChecked from '../assets/img/heart-regular.svg';
import ColorThief from "colorthief";
import _ from 'lodash';


class _StationDetails extends Component {
    state = {
        stationId: null,
        station: null,
        isPlaying: false,
        songs: null,
        isLike: false
    }
    async componentDidMount() {
        await this.loadStation()
        let user = await this.props.user
        if (!user) {
            await this.props.loadUser();
            user = await this.props.user
        }
        if (this.state.station) {
            if (user.likedStations.includes(this.state.station._id)) {
                this.setState({ isLike: true })
            }
            else this.setState({ isLike: false })
        }

    }

    async componentDidUpdate() {
        const { stationId } = this.props.match.params
        if (stationId !== this.state.station._id && stationId !== this.state.station.ganer) {
            await this.loadStation()
            let user = await this.props.user
            if (!user) {
                await this.props.loadUser();
                user = await this.props.user
            }
            if (this.state.station) {
                if (user.likedStations.includes(this.state.station._id)) {
                    this.setState({ isLike: true })
                }
                else this.setState({ isLike: false })
            }
        }
    }


    loadStation = async () => {
        const { stationId } = this.props.match.params
        let station = await stationService.getStationById(stationId)
        if (!station) {
            station = await stationService.getStationByTag(stationId)
            if (station)
                station = station[0]
            //<Redirect> </Redirect>
        }
        if (station) {
            this.setState({ station, stationId: station._id, songs: station.songs })
        }
        else this.setState({ station: [] })
    }

    playRandTrack = () => {
        if (!this.props.currTrack) {
            const songs = [...this.state.station.songs];
            const idx = Math.floor(Math.random() * (songs.length))
            const track = songs[idx]
            this.props.setCurrTrack(track, idx);
            this.props.setQueue(songs, idx);
        }
        this.props.toggleIsPlaying()
    }


    onSortEnd = ({ oldIndex, newIndex }) => {
        const { station } = this.state
        station.songs = arrayMoveImmutable(station.songs, oldIndex, newIndex)
        this.setState((prevState) => ({ ...prevState, station }))
        this.props.setQueue([...station.songs])

    }

    toggleLike = async (ev, stationOrTrack) => {
        ev.stopPropagation()
        this.setState({ isLike: !this.state.isLike }, () => {
            if (this.state.isLike)
                this.props.addLikeToTrack(this.state.station._id, stationOrTrack)
            else {
                this.props.removeLikeFromTrack(this.state.station._id, stationOrTrack)
            }
        })
    }


    render() {
        const { station } = this.state
        if (!station) return <h1>not found</h1>
        const { loadStations, addToNextQueue, stations } = this.props;
        return (
            <section className='station-details'>
                <div className="station-head flex">
                    <div className='img-container'>

                        {station.imgUrl &&
                            <img className='square-ratio' src={station.imgUrl} />
                        }
                        {station.songs.length > 0 && !station.imgUrl &&
                            <img className='square-ratio' src={`${station.songs[0].imgUrl}`} />
                        }
                        {!station.songs.length &&
                            <img className='square-ratio' src={stationImg} />
                        }

                    </div>
                    <div className="title-details">
                        <p>Playlist</p>
                        <h1>{station.name}</h1>
                        <ul className="clean-list flex">
                            <li>{station.createdBy?.fullname}</li>
                            <li>{station.songs.length} songs</li>
                        </ul>
                    </div>
                </div>
                <Link className="fas back fa-chevron-left" to="/"></Link>
                <div className='bar-action flex'>
                    <button className="play-rand" onClick={this.playRandTrack}>
                        <i class={this.props.isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
                    </button>
                    {
                        this.state.isLike && <span className='isLike' style={{ fontSize: "32px" }} onClick={(ev) => { this.toggleLike(ev, 'station') }} class="fas fa-heart"></span>
                    }
                    {
                        !this.state.isLike && <img className='isnotLike' src={heartNotChecked} onClick={(ev) => { this.toggleLike(ev, 'station') }} />
                    }
                </div>
                <MainLayout>
                    <DraggableTrackList songs={station.songs} currStation={station}
                        axis='xy' loadStation={this.loadStation} onSortEnd={this.onSortEnd}
                        distance='20' />

                </MainLayout>
            </section>
        )
    }

}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        isPlaying: state.stationMoudle.isPlaying,
        queue: state.stationMoudle.queue,
        currTrack: state.stationMoudle.currTrack,
        user: state.userMoudle.user,

    }
}
const mapDispatchToProps = {
    setCurrTrack,
    setQueue,
    loadStations,
    addToNextQueue,
    addLikeToTrack,
    loadUser,
    removeLikeFromTrack,
    toggleIsPlaying
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)