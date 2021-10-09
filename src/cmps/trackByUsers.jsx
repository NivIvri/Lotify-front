import React, { Component } from 'react'
import { userService } from '../services/user.service';
import { connect } from 'react-redux'
import { loadUsers, updateUser } from '../store/user.actions';
import { loadUser } from '../store/user.actions';
import { PrackByUserPreview } from './trackByUser-preview';


class _TrackByUsers extends Component {
    state = {
        users: [],
        userImg: [],
    }

    getCurrTrack = (currUserId) => {
        let trackAndUser = this.props.trackAndUsers.filter(traclANdUser => {
            if (traclANdUser.user._id === currUserId)
                return traclANdUser.track
        })
        if (!trackAndUser.length)
            trackAndUser = false

        else trackAndUser = trackAndUser[0]
        return trackAndUser
    }


    render() {
        const { user, users } = this.props

        if (!this.state.users || !this.props.user) return <div>loading</div>
        return (
            <>
                <div className='flex header'>
                    <span>Username</span>
                    <span className='is-active'>status</span>
                    <span>Listening to</span>
                </div>
                <div className='user-track'>


                    {user && user.following.reverse().map((currUserId) => {
                        console.log(user.following, 'user.following');
                        return <PrackByUserPreview users={this.props.users}
                            currUserId={currUserId} usersImgs={this.props.usersImgs} user={users.find((user => user._id === currUserId))?.username} track={this.getCurrTrack(currUserId)} />
                    })}

                </div>
            </>
        )
    }
}



function mapStateToProps(state) {
    return {
        user: state.userMoudle.user,
        //users: state.userMoudle.users,
    }
}
const mapDispatchToProps = {
    loadUser
}
export const TrackByUsers = connect(mapStateToProps, mapDispatchToProps)(_TrackByUsers)

