import React, { Component } from 'react'
import Avatar from 'react-avatar';
import { connect } from 'react-redux'
import { loadStations, addToNextQueue, setCurrTrack, setQueue } from '../store/station.actions.js';
class _PrackByUserPreview extends Component {

    playTrack = async (track, idx) => {
        const { currStation } = this.props
        let songs = [track]
        await this.props.setCurrTrack(track, idx);
        if (!track.nextQueue) {
            await this.props.setQueue(songs, currStation?._id)
        }
    }

    render() {
        return (
            <div className={'user-preview flex'}>
                <div>
                    <Avatar size="100" facebook-id="invalidfacebookusername" src={this.props.usersImgs.find(imgObj => this.props.currUserId === imgObj.id)?.url} size="60" round={true} />
                    {this.props.users && <span >
                        {this.props.users.find((user => user._id === this.props.currUserId))?.username}</span>}
                </div>
                {this.props.track &&
                    <span className='is-active'>is active </span>
                }
                {this.props.track &&
                    <div className={"track"} onClick={() => { this.playTrack(this.props.track.track, 0) }}>
                        {<img src={this.props.track.track.imgUrl} />}
                        <div><p> {this.props.track.track.title}</p></div>
                    </div>
                }
                {!this.props.track && <div>
                    <span className='is-active'> User is not active</span></div>}
                {!this.props.track && <div>
                    <span></span></div>}
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
}


export const PrackByUserPreview = connect(mapStateToProps, mapDispatchToProps)(_PrackByUserPreview)

