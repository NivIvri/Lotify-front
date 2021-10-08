import React, { Component } from 'react'
import Avatar from 'react-avatar';
import { connect } from 'react-redux'
import { loadStations, addToNextQueue, setCurrTrack, setQueue } from '../store/station.actions.js';
class _PrackByUserPreview extends Component {

    playTrack = async (track, idx) => {
        debugger
        const { currStation } = this.props
        let songs = [track]
        await this.props.setCurrTrack(track, idx);
        if (!track.nextQueue) {
            await this.props.setQueue(songs, currStation?._id)
        }
    }

    render() {
        return (
            <tr className={'user-preview'}>
                <td>
                    <Avatar size="100" facebook-id="invalidfacebookusername" src={this.props.usersImgs.find(imgObj => this.props.currUserId === imgObj.id)?.url} size="60" round={true} />  </td>
                {this.props.users && <td >
                    {this.props.users.find((user => user._id === this.props.currUserId))?.username}</td>}
                {this.props.track &&
                    <td>is active </td>
                }
                {this.props.track &&
                    <td className={"track"} onClick={() => { this.playTrack(this.props.track.track, 0) }}>
                        {<img src={this.props.track.track.imgUrl} />}
                        <div><p> {this.props.track.track.title}</p></div>
                    </td>
                }
                {!this.props.track && <td>
                    <span> User is not active</span></td>}
                {!this.props.track && <td>
                    <span></span></td>}
            </tr>
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

