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
import { Search } from './search.jsx';
import { stationServiceNew } from '../services/station.service.js';

class _StationDetails extends Component {
    state = {
        stationId: null,
        station: null,
        isPlaying: false,
        songs: null,
        isLike: false,
        isFindMore: false,
        isShowAll: false
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

    async componentDidUpdate(prevState) {
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
        const { stationId } = this.props.match.params;

        try {
            debugger
            var station = await stationServiceNew.getStationById(stationId)

        }
        catch {
            station = await stationService.getStationByTag(stationId)
            if (station)
                station = station[0]
        }
        let user;
        if (stationId === 'likedTracks') {
            user = await this.props.user
            if (!user) {
                await this.props.loadUser();
                user = await this.props.user
                // console.log('user', user);
            }
            if (user.likedTracks) {
                // console.log(user.likedTracks);
                station.songs = [...user.likedTracks]
            }
            else {
                console.log('no liked tracks');
            }
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
            this.props.setQueue([...songs], this.state.stationId);
        }
        this.props.toggleIsPlaying()
    }


    onSortEnd = ({ oldIndex, newIndex }) => {
        const { station } = this.state
        station.songs = arrayMoveImmutable(station.songs, oldIndex, newIndex)
        this.setState((prevState) => ({ ...prevState, station }))
        if (this.props.currTrack && this.props.playedStation === this.state.stationId) {
            this.props.setQueue([...station.songs], this.state.stationId)
        }
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
        const { station, isFindMore, isShowAll } = this.state
        if (!station) return <h1>not found</h1>
        const { loadStations, addToNextQueue, stations } = this.props;
        return (
            <section className='station-details'>
                <div className="station-head flex">
                    {station.songs.length > 0 &&
                        <img src={`${station.songs[0].imgUrl}`} />
                    }
                    {!station.songs.length &&
                        <img src={stationImg} />
                    }
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
                        <i class={this.props.isPlaying && this.props.playedStation === station._id ? "fas fa-pause" : "fas fa-play"}></i>
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
                        distance='20' isShowAll={isShowAll} />
                    <div className='show-btn flex'>
                        <div className='find-more' onClick={() => { this.setState({ isShowAll: !this.state.isShowAll }) }}>
                            {isShowAll ? 'Show less' : 'Show all playlist'}
                        </div>
                        <div className='find-more' onClick={() => { this.setState({ isFindMore: !this.state.isFindMore }) }}>
                            {isFindMore ? 'Find less' : 'Find more tracks!'}
                        </div>
                    </div>
                    {isFindMore &&
                        <>
                            <span>Let's find something to your station</span>
                            <Search loadStation={this.loadStation} stationId={this.state.stationId} isOnDeatils={true} />
                        </>
                    }
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
        playedStation: state.stationMoudle.playedStation,
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
    toggleIsPlaying,
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)