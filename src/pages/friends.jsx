import React, { Component } from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import { SearchResultUser } from '../cmps/searchResultUser';
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service';
var _ = require('lodash');
export default class Friends extends Component {
    state = {
        trackAndUsers: [],
        userResult: [],
        isOnSearch: false
    }
    componentDidMount() {
        socketService.setup()
        socketService.on('user track', ({ track, user }) => {
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
    delayedHandleChange = _.debounce(async () => {
        if (!this.state.keySearch) return
        var userResult = await userService.getUsers(this.state.keySearch);
        if (!userResult) {
            userResult = []
        }
        if (userResult.length === 0) return
        else {
            this.setState({ userResult }, () => {
                this.setState({ isOnSearch: true })
            })
        }
    }, 700);

    handleChange = async ({ target }) => {
        this.setState({ keySearch: target.value }, () => {
            if (this.state.keySearch === '' || this.state.keySearch === ' ') {
                this.setState({ isOnSearch: false })
                return
            }
            this.delayedHandleChange(this.state.keySearch)
        })
    }


    render() {
        const { trackAndUsers, isOnSearch, userResult } = this.state
        if (!trackAndUsers) return <div>loading</div>
        return (
            <MainLayout>
                <section>
                    <form onSubmit={(ev) => ev.stopPropagation()}>
                        <input type='text' placeholder='Search your friends' onChange={this.handleChange} />
                    </form>
                    {
                        isOnSearch &&
                        <SearchResultUser userResult={userResult} />
                    }
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
            </MainLayout>
        )
    }
}
