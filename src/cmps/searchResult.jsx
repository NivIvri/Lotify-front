import { TrackList } from '../cmps/trackList';
import React from 'react'

export class SearchResult extends React.Component {
    state = {
        trackResult: null,
    }
    componentDidMount() {
        const { trackResult } = this.props
        this.setState({ trackResult })
        console.log(trackResult.slice(1), 'slice');

    }
    componentDidUpdate(prevProps) {
        if (this.props.trackResult !== prevProps.trackResult) {
            const { trackResult } = this.props
            this.setState({ trackResult })
        }
    }

    render() {
        const { trackResult } = this.state
        console.log(trackResult, 'trackResult');
        if (!trackResult || !trackResult.length) return <div>No track found</div>
        return (
            <section className='search-result-container'>

                <div className='grid-search-result-container'>
                    <span className='title'>top Result</span>
                    <span className='title'>songs</span>
                    <div className='grid-element-1'>
                        <div className='img-container'>
                            <img className='img-top-result' src={trackResult[0].imgUrl} />
                        </div>
                        <span>
                            {trackResult[0].title}</span>

                    </div>
                    {trackResult.length > 1 &&
                        <table>
                            <thead></thead>
                            <tbody>
                                <TrackList songs={trackResult.slice(1, 5)} playTrack={this.props.playTrack} onAddToNextQueue={this.props.onAddToNextQueue} />
                            </tbody>
                        </table>

                    }

                </div>
            </section>
        )
    }
}
