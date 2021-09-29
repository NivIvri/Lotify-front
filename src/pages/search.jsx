import React from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import mood from '../assets/img/mood-search.jpg';
import pop from '../assets/img/pop-search.jpg';
import chill from '../assets/img/chill-search.jpg';
import summer from '../assets/img/summer-search.jpeg';
import latin from '../assets/img/latin-search.jpg';
import jazz from '../assets/img/jazz-search.jpg';
import indie from '../assets/img/indie-search.jpg';
import wellness from '../assets/img/wellness-search.jpg';
import sleep from '../assets/img/sleep-search.jpg';
import decades from '../assets/img/decades-search.jpg';
import workout from '../assets/img/workout-search.jpg';
import party from '../assets/img/party-search.jpg';
import focus from '../assets/img/focus-search.jpg';
import alternativ from '../assets/img/alternativ-search.jpg';
import travel from '../assets/img/travel-search.jpg';
import soul from '../assets/img/soul-search.jpg';
import funk from '../assets/img/funk-search.jpg';
import metal from '../assets/img/metal-search.jpg';
import classical from '../assets/img/classical-search.jpg';
import blues from '../assets/img/blues-search.jpg';
//import { debounce, throttle } from 'lodash';
import { Link } from 'react-router-dom'
import { stationService } from "../services/async-storage.service.js";
import { connect } from 'react-redux'
import { setCurrTrack, addToNextQueue, setQueue, playNextTrack } from '../store/station.actions.js';
import { SearchResultTrack } from '../cmps/searchResultTrack';
import { SearchResultStation } from '../cmps/searchResultStation';
var _ = require('lodash');


class _Search extends React.Component {
    state = {
        keySearch: null,
        isOnSearch: false,
        trackResult: null,
        stationResult: null
    }

    //delayedHandleChange = _.debounce(eventData => stationService.searchSong(eventData), 700);

    componentDidMount() {
        document.body.style.backgroundImage = ' linear-gradient(#03080d, #121212)'

    }
    componentWillUnmount() {
        document.body.style.backgroundImage = 'linear-gradient(#0F2C43, #121212)';
    }
    delayedHandleChange = _.debounce(async () => {
        debugger
        let trackResult = await stationService.searchSong(this.state.keySearch);
        let stationResult = await stationService.searchStation(this.state.keySearch);
        if (trackResult.length === 0) return
        else {
            this.setState({ trackResult, stationResult }, () => {
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

    onPlayTrack = async (track = null, idx = null) => {
        if (!track && !idx) {
            this.setState(prevState => ({ ...prevState }))
            return
        }
        this.props.setCurrTrack(track, idx);
        this.props.setQueue([track], idx)
    }


    render() {
        const { trackResult, isOnSearch, stationResult } = this.state
        return (
            <section className='search'>
                <MainLayout>
                    <form onSubmit={(ev) => ev.stopPropagation()}>
                        <input type='text' placeholder='Artists, songs or podcasts ' onChange={this.handleChange} />
                    </form>
                    {
                        isOnSearch &&
                        <SearchResultTrack trackResult={trackResult} playTrack={this.onPlayTrack} />
                    }
                    {
                        isOnSearch &&
                        <SearchResultStation stationResult={stationResult} playTrack={this.onPlayTrack} />
                    }
                    <div className='title'>Browse all</div>
                    <div className='grid-container-search'>
                        <Link to="searchs/pop">
                            <div className="grid-element-1" style={{ backgroundColor: 'rgb(141, 103, 171)' }}><span>pop</span>
                                <img src={pop} />
                            </div>
                        </Link>
                        <Link to="searchs/chill">
                            <div className="div3" style={{ backgroundColor: 'rgb(71, 125, 149)' }}><span>chill</span> <img src={chill} /></div>
                        </Link>
                        <Link to="searchs/party">
                            <div className="div4" style={{ backgroundColor: 'rgb(175, 40, 150)' }} ><span>party</span><img src={party} /></div>
                        </Link>
                        <Link to="searchs/focus">
                        <div className="div5" style={{ backgroundColor: 'rgb(80, 55, 80)' }}><span>focus</span><img src={focus} /></div>
                        </Link>
                        <Link to="searchs/alternative">
                        <div className="div6" style={{ backgroundColor: 'rgb(180, 155, 200)' }}><span>alternativ</span><img src={alternativ} /></div>
                        </Link>
                        <Link to="searchs/summer">
                        <div className="div14" style={{ backgroundColor: 'rgb(255, 200, 100)' }}><span>summer</span><img src={summer} /></div>
                        </Link>
                        <Link to="searchs/indie">
                        <div className="div7" style={{ backgroundColor: 'rgb(96, 129, 8)' }}><span>indie</span><img src={indie} /></div>
                        </Link>
                        <Link to="searchs/latin">
                        <div className="div19" style={{ backgroundColor: 'rgb(225, 51, 0)' }}><span>latin</span><img src={latin} /></div>
                        </Link>
                        <Link to="searchs/wellness">
                        <div className="div8" style={{ backgroundColor: 'rgb(71, 125, 149)' }}><span>wellness</span><img src={wellness} /></div>
                        </Link>
                        <Link to="searchs/sleep">
                        <div className="div9" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>sleep</span><img src={sleep} /></div>
                        </Link>
                        <Link to="searchs/decades">
                        <div className="div10" style={{ backgroundColor: 'rgb(186, 93, 7)' }}><span>decades</span><img src={decades} /></div>
                        </Link>
                        <Link to="searchs/workout">
                        <div className="div11" style={{ backgroundColor: 'rgb(119, 119, 119)' }}><span>workOut</span><img src={workout} /></div>
                        </Link>
                        <Link to="searchs/at-home">
                        <div className="div12" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>at Home</span><img src={wellness} /></div>
                        </Link>
                        <Link to="searchs/travel">
                        <div className="div13" style={{ backgroundColor: 'rgb(45, 70, 185)' }}><span>travel</span><img src={travel} /></div>
                        </Link>
                        <Link to="searchs/soul">
                        <div className="div15" style={{ backgroundColor: 'rgb(220, 20, 140)' }}><span>soul</span><img src={soul} /></div>
                        </Link>
                        <Link to="searchs/jazz">
                        <div className="div16" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>jazz</span><img src={jazz} /></div>
                        </Link>
                        <Link to="searchs/funk">
                        <div className="div17" style={{ backgroundColor: 'rgb(230, 30, 50)' }}><span>funk</span><img src={funk} /></div>
                        </Link>
                        <Link to="searchs/mood">
                        <div className="grid-element-2" style={{ backgroundColor: 'rgb(141, 103, 171)' }}><span>mood</span><img src={mood} /></div>
                        </Link>
                        <Link to="searchs/metal">
                        <div className="div18" style={{ backgroundColor: 'rgb(119, 119, 119)' }}><span>metal</span><img src={metal} /></div>
                        </Link>
                        <Link to="searchs/classical">
                        <div className="div20" style={{ backgroundColor: 'rgb(225, 51, 0)' }}><span>classical</span><img src={classical} /></div>
                        </Link>
                        <Link to="searchs/blues">
                        <div className="div21" style={{ backgroundColor: 'rgb(13, 115, 236)' }}><span>blues</span><img src={blues} /></div>
                        </Link>
                        <span></span>
                    </div>
                </MainLayout>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations
    }
}
const mapDispatchToProps = {
    setCurrTrack,
    addToNextQueue,
    setQueue
}


export const Search = connect(mapStateToProps, mapDispatchToProps)(_Search)