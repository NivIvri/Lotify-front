import React, { Component } from 'react'

export class SearchResultUser extends Component {


    render() {
        const { user, trackAndUsers } = this.props
        console.log(trackAndUsers);
        return (
            <table>
                <thead></thead>
                <tbody>
                    {user.following.map(currUserId => {
                        return <tr className={'user-prewiew'}>
                            <td>{currUserId}</td>
                            <td><button>the user following me</button></td>
                            <td>{
                                trackAndUsers.map(traclANdUser => {
                                    if (traclANdUser.user._id === currUserId)
                                        return traclANdUser.track.title
                                })
                            }</td>
                        </tr>
                    })}
            
                </tbody>
            </table>
        )
    }
}

//{trackAndUsers &&
//    trackAndUsers.map(trackAndUser => {
//        return <tr className={'user-prewiew'}>
//            <td>{trackAndUser.user.username}</td>
//            <td>{trackAndUser.track.title}</td>
//            {/*<td><button>the user following me</button></td>*/}
//        </tr>
//    })}