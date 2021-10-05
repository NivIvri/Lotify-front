import React, { Component } from 'react'
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'

export default class Friends extends Component {
    state = {
        trackAndUsers: []
    }
    componentDidMount() {
        socketService.setup()
        socketService.on('user track', ({ track, user }) => {
            debugger
            const trackAndUserIdx = this.state.trackAndUsers.findIndex(trackAndUser => trackAndUser.user._id === user._id)
            if (trackAndUserIdx !== -1) {

                let trackAndUsers = [...this.state.trackAndUsers];
                let trackAndUser = { ...trackAndUsers[trackAndUserIdx] };
                trackAndUser.track = track;
                trackAndUsers[trackAndUserIdx] = trackAndUser
                this.setState({ trackAndUsers });
            }
            else {
                this.setState({ trackAndUsers: [...this.state.trackAndUsers, ({ track, user })] })
            }
        })
    }
    //componentDidUpdate(prevState) {
    //    debugger
    //    if (prevState.tracks?.length !== this.state.tracks.length)
    //            this.setState({ tracks: allTrack })
    //}


    render() {
        const { trackAndUsers } = this.state
        if (!trackAndUsers) return <div>loading</div>
        return (
            <section>
                {trackAndUsers &&
                    trackAndUsers.map((trackAndUser) => {
                        debugger
                        return <div>
                            {trackAndUser.track.title}
                            {trackAndUser.user.username}
                        </div>
                    })
                }
            </section>
        )
    }
}
