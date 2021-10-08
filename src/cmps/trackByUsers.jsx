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
        console.log(trackAndUser, 'trackAndUsertrackAndUsertrackAndUser');
        return trackAndUser
    }


    render() {
        const { user, users } = this.props

        if (!this.state.users || !this.props.user) return <div>loading</div>
        return (
            <div className='user-track'>

                <table>
                    <thead>
                        <th colSpan={2}>Username</th>
                        <th>status</th>
                        <th>Listening to</th>
                    </thead>


                        <tbody>
                            {user && user.following.map((currUserId) => {
                                return <PrackByUserPreview users={this.props.users}
                                    currUserId={currUserId} usersImgs={this.props.usersImgs} user={users.find((user => user._id === currUserId))?.username} track={this.getCurrTrack(currUserId)} />
                                //return <tr className={'user-prewiew'}>
                                //    <td>
                                //        <Avatar size="100" facebook-id="invalidfacebookusername" src={this.props.usersImgs.find(imgObj => currUserId === imgObj.id)?.url} size="60" round={true} />  </td>
                                //    <td>{users &&
                                //        users.find((user => user._id === currUserId))?.username}</td>
                                //    <td>
                                //    </td>

                                //    <td>{
                                //        this.getCurrTrack(currUserId)
                                //    }</td>
                                //</tr>
                            })}
                        </tbody>
                </table>
            </div>
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

