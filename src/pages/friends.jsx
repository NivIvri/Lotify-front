import React, { Component } from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import { SearchResultUser } from '../cmps/searchResultUser';
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service';
import { connect } from 'react-redux'

var _ = require('lodash');
class _Friends extends Component {
    state = {
        trackAndUsers: [],
        userResult: [],
        isOnSearch: false
    }
    componentDidMount() {
        socketService.setup()
        debugger
        this.setState({ trackAndUsers: this.props.trackAndUsers })
    }
    //componentDidUpdate(prevProps) {
    //    if (this.props.trackAndUsers !== prevProps.trackAndUsers) {
    //        this.setState({ trackAndUsers: this.props.trackAndUsers })
    //    }
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
        const {  isOnSearch, userResult } = this.state
        const  trackAndUsers = this.props.trackAndUsers
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
                            
                            return <div>
                                {trackAndUser?.track.title}
                                {trackAndUser?.user.username}
                            </div>
                        })
                    }
                </section>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        trackAndUsers: state.friendMoudle.trackAndUsers
    }
}
const mapDispatchToProps = {
}


export const Friends = connect(mapStateToProps, mapDispatchToProps)(_Friends)

