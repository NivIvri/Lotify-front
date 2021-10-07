import React, { Component } from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import { TrackByUsers } from '../cmps/trackByUsers';
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service';
import { connect } from 'react-redux'
import { loadUsers, updateUser } from '../store/user.actions';
import Avatar from 'react-avatar';


var _ = require('lodash');
class _Friends extends Component {
    state = {
        trackAndUsers: [],
        usersImgs: [],
        users: [],
    }
    componentDidMount() {
        socketService.setup()
        this.setState({ trackAndUsers: this.props.trackAndUsers })
        console.log(this.state.trackAndUsers, 'trackAndUsers');
        let usersImgs = this.props.users.map(user => {
            return user.img ? {url:user.img, id:user._id} :
            {url:"https://cdn-icons-png.flaticon.com/512/149/149071.png", id:user._id}
        
        })
        this.setState({ usersImgs })
        this.loadUsers('')
    }
    loadUsers = (keySearch = '') => {
        if (!keySearch) this.setState({ users: this.props.users })
        else {
            let filterUsers = this.props.users.filter(user => user.username.toUpperCase().includes(keySearch.toUpperCase()))
            this.setState({ users: filterUsers })
        }

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

    handleChange = async ({ target }) => {
        this.loadUsers(target.value)
    }
    onFollow = (userIdToFollow, isFollow) => {
        let user = { ...this.props.user }
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
        const { user } = this.props
        const { users } = this.state
        if (!users) return <div>loading</div>
        return (
            <MainLayout>
                <section className='friends-container'>
                    <h1>Friend Activity</h1>
                    <div className="friend-following flex">
                        <div className='all-users-container'>
                            <div><input type='text' onChange={this.handleChange} /></div>
                            <div className='users-table'>
                                <table>
                                    <thead>

                                    </thead>
                                    <tbody>
                                        {users &&
                                            users.map((currUser, idx) => {
                                                return <tr>
                                                    <td>
                                                        <Avatar size="100" facebook-id="invalidfacebookusername" src={this.state.usersImgs[idx].url} size="60" round={true} />
                                                    </td>
                                                    <td>
                                                        {currUser.username}
                                                    </td>
                                                    <td>
                                                        {user.following.includes(currUser._id) &&
                                                            <button onClick={() => { this.onFollow(currUser._id, true) }}> unfollow</button>
                                                        }
                                                        {!user.following.includes(currUser._id) &&
                                                            <button onClick={() => { this.onFollow(currUser._id, false) }} >follow</button>
                                                        }
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <section className='following-by-user-container flex column'>
                            <h1>Friend Activity</h1>
                            <TrackByUsers trackAndUsers={trackAndUsers} usersImgs={this.state.usersImgs} />
                        </section>

                    </div>
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

