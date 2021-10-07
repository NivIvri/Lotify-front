import React, { Component } from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import { SearchResultUser } from '../cmps/searchResultUser';
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service';
import { connect } from 'react-redux'
import { updateUser } from '../store/user.actions';


var _ = require('lodash');
class _Friends extends Component {
    state = {
        trackAndUsers: [],
    }
    componentDidMount() {
        socketService.setup()
        this.setState({ trackAndUsers: this.props.trackAndUsers })
        console.log(this.state.trackAndUsers, 'trackAndUsers');
    }


    //delayedHandleChange = _.debounce(async () => {
    //    if (!this.state.keySearch) return
    //    var userResult = await userService.getUsers(this.state.keySearch);
    //    if (!userResult) {
    //        userResult = []
    //    }
    //    if (userResult.length === 0) return
    //    else {
    //        this.setState({ userResult }, () => {
    //            this.setState({ isOnSearch: true })
    //        })
    //    }
    //}, 700);

    //handleChange = async ({ target }) => {
    //    this.setState({ keySearch: target.value }, () => {
    //        if (this.state.keySearch === '' || this.state.keySearch === ' ') {
    //            this.setState({ isOnSearch: false })
    //            return
    //        }
    //        this.delayedHandleChange(this.state.keySearch)
    //    })
    //}
    onFollow = (userIdToFollow, isFollow) => {
        let user = this.props.user
        if (isFollow) {
            let following = user.following.filter(userId => userId !== userIdToFollow)
            user.following = following
        }
        else {
            user.following.push(userIdToFollow)
        }
        this.props.updateUser(user)
    }


    render() {
        const trackAndUsers = this.props.trackAndUsers
        const { users, user } = this.props

        //if (!trackAndUsers || !fromUsers) return <div>loading</div>
        return (
            <MainLayout>
                <div>Friend Activity</div>
                <section className='friends-container flex'>
                    <div className='all-users-container'>
                        {users &&
                            users.map(currUser => {
                                return <div>
                                    {currUser.username}
                                    {user.following.includes(currUser._id) &&
                                        <button onClick={() => { this.onFollow(currUser._id, true) }}> unfollow</button>
                                    }
                                    {!user.following.includes(currUser._id) &&
                                        <button onClick={() => { this.onFollow(currUser._id, false) }} >follow</button>
                                    }
                                </div>
                            })
                        }
                        {users &&
                            users.map(currUser => {
                                return <div>
                                    {currUser.username}
                                    {user.following.includes(currUser._id) &&
                                        <button onClick={() => { this.onFollow(currUser._id, true) }}> unfollow</button>
                                    }
                                    {!user.following.includes(currUser._id) &&
                                        <button onClick={() => { this.onFollow(currUser._id, false) }} >follow</button>
                                    }
                                </div>
                            })
                        }
                    </div>
                    <section className='following-by-user-container'>
                        <SearchResultUser user={this.props.user} trackAndUsers={trackAndUsers} />
                    </section>


                    {/*<form onSubmit={(ev) => ev.stopPropagation()}>
                        <input type='text' placeholder='Search your friends' onChange={this.handleChange} />
                    </form>
                    {
                        isOnSearch &&
                        <SearchResultUser userResult={userResult} user={this.props.user} />
                    }
                    {trackAndUsers &&
                        trackAndUsers.map((trackAndUser) => {
                            return <div>
                                {trackAndUser?.track.title}
                                {trackAndUser?.user.username}
                            </div>
                        })
                    }*/}

                </section>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        trackAndUsers: state.friendMoudle.trackAndUsers,
        user: state.userMoudle.user,
        users: state.userMoudle.users,
    }
}
const mapDispatchToProps = {
    updateUser
}


export const Friends = connect(mapStateToProps, mapDispatchToProps)(_Friends)

