import React, { Component } from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import { TrackByUsers } from '../cmps/trackByUsers';
import { eventBusService, showSuccessMsg } from '../services/event-bus.service'
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
    async componentDidMount() {
        await this.props.loadUsers()
        socketService.setup()
        this.setState({ trackAndUsers: this.props.trackAndUsers })
        console.log(this.state.trackAndUsers, 'trackAndUsers');
        await this.loadUsers('')
        let usersImgs = this.state.users.map(user => {
            return user.img ? { url: user.img, id: user._id } :
                { url: "https://cdn-icons-png.flaticon.com/512/149/149071.png", id: user._id }
        })
        this.setState({ usersImgs })
    }

    loadUsers = (keySearch = '') => {

        if (!keySearch) {
            let filterUsers = this.props.users.filter(user => {
                if (user._id !== '615b1395706f019209666d5d' && user._id !== this.props.user?._id) {
                    return user
                }
            })
            this.setState({ users: filterUsers })
            //this.setState({ users: this.props.users })
        }
        else {
            let filterUsers = this.props.users.filter(user => user.username.toUpperCase().includes(keySearch.toUpperCase()) && user._id !== '615b1395706f019209666d5d' && user._id !== this.props.user._id)
            this.setState({ users: filterUsers })
        }
    }

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
            socketService.emit('following', { userIdToFollow, currUser: user })
        }
        this.props.updateUser(user)
    }

    render() {
        const trackAndUsers = this.props.trackAndUsers
        const { user } = this.props
        const { users } = this.state
        if (!users || !this.state.usersImgs) return <div>loading</div>
        return (
            <MainLayout>
                <section className='friends-container'>
                    <h1> Follow your friends!</h1>
                    <div className="friend-following flex">
                        <div className='all-users-container'>
                            <div><input type='text' onChange={this.handleChange} placeholder="Search you friends" /></div>
                            <div className='users-table'>
                                {users &&
                                    users.reverse().map((currUser, idx) => {
                                        return <div className='friend-following-preview flex'>
                                            <div>
                                                <Avatar size="100" facebook-id="invalidfacebookusername" src={this.state.usersImgs.find(imgObj => currUser._id === imgObj.id)?.url} size="60" round={true} />
                                                <span>
                                                    {currUser.username}
                                                </span>
                                            </div>


                                            <div>
                                                {user.following.includes(currUser._id) &&
                                                    <button className='following' onClick={() => { this.onFollow(currUser._id, true) }}> Unfollow</button>
                                                }
                                                {!user.following.includes(currUser._id) &&
                                                    <button className='follow' onClick={() => { this.onFollow(currUser._id, false) }} >Follow</button>
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <section className='following-by-user-container flex column'>
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
    updateUser,
    loadUsers
}


export const Friends = connect(mapStateToProps, mapDispatchToProps)(_Friends)

