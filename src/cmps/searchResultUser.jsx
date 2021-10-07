import React, { Component } from 'react'

export class SearchResultUser extends Component {
    onFollow = (usrId) => {

    }

    render() {
        const users = this.props.userResult
        return (
            <table>
                <thead></thead>
                <tbody>
                    {users.map(user => {
                        
                        return <tr className={'user-prewiew'}>
                            <td>{user.username}</td>
                            <td><button onClick={this.onFollow(user._id)}>Follow</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        )
    }
}

