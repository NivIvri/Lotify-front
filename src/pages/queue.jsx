import React from 'react'
import { StationDetails } from './station-details'
import { connect } from 'react-redux'
import { TrackList } from '../cmps/trackList'
import { setCurrTrack, addToNextQueue } from '../store/station.actions.js';
import { TrackPreview } from '../cmps/track-preview';
import { Link } from 'react-router-dom'
import { MainLayout } from '../cmps/layout/MainLayout';

class _Queue extends React.Component {
    componentDidMount() {
        document.body.style.backgroundImage = ' linear-gradient(#03080d, #121212)'
    }



    onAddToNextQueue = (track) => {
        this.props.addToNextQueue(track)
    }
    render() {

        const songs = this.props.queue
        if (!songs.length && !this.props.playNextQueue) return <div><span>Add to your queue</span>
            <span>Tap "Add to queue" from a trackws menu to see it here</span>
            <Link to='/search'>
                <button>FIND SOMETHING TO PLAY</button>
            </Link>
        </div>
        console.log(this.props.playNextQueue, 'playNextQueue');


        // return (
        //      <div className="track-container flex" onClick={() => this.playTrack(track, idx)}>
        //         <div className="track-num">{idx + 1}</div>
        //         <div className="track-img"><img src={track.imgUrl} alt="" /></div>
        //         <div className="track-title">{track.title}</div>
        //         <div className="track-duration">{this.getTimeFromDuration(track.duration)}</div>
        //         <div className='likes'>
        //             {
        //                 //this.state.isLike && <img className='islike' src={heartChecked} onClick={(ev) => { this.toggleLike(ev) }} />
        //                 this.state.isLike && <span className='isLike' onClick={(ev) => { this.toggleLike(ev) }} class="fas fa-heart"></span>
        //             }
        //             {
        //                 !this.state.isLike && <img className='isnotLike' src={heartNotChecked} onClick={(ev) => { this.toggleLike(ev) }} />
        //             }
        //         </div>
        //         <div className="button-cell track-actions" onClick={(ev) => { ev.stopPropagation() }}>
        //             <Menu menuButton={
        //                 <MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
        //                 <MenuItem onClick={() => this.props.addToNextQueue(track)}>Add To queue</MenuItem>
        //                 {currStation && <MenuItem onClick={() => {
        //                     this.onRemoveFromStation(track, currStation._id)
        //                 }
        //                 }>Remove from station</MenuItem>}
        //                 <SubMenu label="Add to playlist">
        //                     {stations.map((station) => {
        //                         return (<MenuItem onClick={() => { this.onAddToStation(track, station._id) }}>{station.name}</MenuItem>)
        //                     })
        //                     }
        //                     <MenuItem onClick={() => eventBusService.emit("create-playlist")}>Create playlist</MenuItem>
        //                 </SubMenu>
        //             </Menu>
        //         </div>
        //     </div>
        // )

        return (
            // <div className='queue-page-wrapper flex column'>
            <MainLayout>
                <div className='station-track-list flex column'>
                    <div className="queue-header">
                        <h2>Queue</h2>
                    </div>
                    <div className="queue-sub-header">
                        <h4>New Playing</h4>
                    </div>
                    <div className="now-playing-container">
                        {
                            this.props.currTrack &&
                            <TrackPreview track={this.props.currTrack} idx={0} playTrack={() => { }} onAddToNextQueue={this.onAddToNextQueue} />
                        }

                    </div>
                    <div className="queue-sub-header">
                        <h4>Playing Next Queue</h4>
                    </div>
                    <div className="playing-next-queue-container">
                        {
                            this.props.playNextQueue &&
                            <TrackList songs={this.props.playNextQueue} onAddToNextQueue={this.onAddToNextQueue} idx={0} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} />
                        }
                    </div>
                    <div className="queue-sub-header">
                        <h4>Queue</h4>
                    </div>
                    <div className="queue-container">

                        {
                            songs &&
                            <TrackList songs={songs} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} onAddToNextQueue={this.onAddToNextQueue} />
                        }
                    </div>
                </div>
            </MainLayout>
        )
    }
}
// {/* //     <table>
//         <thead>
//             <th colSpan='3'>Queue</th>
//         </thead>
//         <tbody>
//             <tr><td colSpan='3'>Now Playing</td> </tr>
// { */}
/* //     this.props.currTrack &&
        // <TrackPreview track={this.props.currTrack} idx={0} playTrack={() => { }} onAddToNextQueue={this.onAddToNextQueue} />
    // } */



/* //             <tr><td colSpan='3'>Play Next Queue</td> </tr>
    // {
    //     this.props.playNextQueue && */
/* //     <TrackList songs={this.props.playNextQueue} onAddToNextQueue={this.onAddToNextQueue} idx={0} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} />
        // }
        //             <tr><td colSpan='3'>QUEUE</td> </tr>
        //             { */
/* // songs &&
    // <TrackList songs={songs} playTrack={(track, idx) => { this.props.setCurrTrack(track, idx) }} onAddToNextQueue={this.onAddToNextQueue} />
    // }
    //         </tbody>
    //     </table> */
/* 
    // </div >
// ) */


function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
        queue: state.stationMoudle.queue,
        playNextQueue: state.stationMoudle.playNextQueue
    }
}
const mapDispatchToProps = {
    setCurrTrack,
    addToNextQueue
}


export const Queue = connect(mapStateToProps, mapDispatchToProps)(_Queue)

