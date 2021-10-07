import React, { Component } from 'react'
import { userService } from '../services/user.service';
import Avatar from 'react-avatar';
import { connect } from 'react-redux'
import { loadUsers, updateUser } from '../store/user.actions';
import { loadUser } from '../store/user.actions';


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
            trackAndUser = 'user is not active'
        else trackAndUser = trackAndUser[0].track.title
        return trackAndUser
    }


    render() {
        const { user,users } = this.props

        if (!this.state.users || !this.props.user) return <div>loading</div>
        return (
            <table>
                <thead></thead>
                <tbody>
                    {user && user.following.map((currUserId) => {
                        return <tr className={'user-prewiew'}>
                            <td><pre>{users &&
                                users.find((user => user._id === currUserId))?.username}</pre></td>
                            <td>
                            </td>
                            <td>
                                <Avatar size="100" facebook-id="invalidfacebookusername" src={this.props.usersImgs.find(imgObj => currUserId === imgObj.id)?.url} size="60" round={true} />  </td>
                            <td>{
                                this.getCurrTrack(currUserId)
                            }</td>
                        </tr>
                    })}

                </tbody>
            </table>
        )
    }
}



function mapStateToProps(state) {
    return {
        user: state.userMoudle.user,
        users: state.userMoudle.users,
    }
}
const mapDispatchToProps = {
    loadUser
}
export const TrackByUsers = connect(mapStateToProps, mapDispatchToProps)(_TrackByUsers)

