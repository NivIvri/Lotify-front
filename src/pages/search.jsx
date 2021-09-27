import React from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import mood from '../assets/img/mood-search.jpg';
import pop from '../assets/img/pop-search.jpg'
import chill from '../assets/img/chill-search.jpg'
import summer from '../assets/img/summer-search.jpeg'
import latin from '../assets/img/latin-search.jpg'
import jazz from '../assets/img/jazz-search.jpg'
import indie from '../assets/img/indie-search.jpg'
import wellness from '../assets/img/wellness-search.jpg'
import sleep from '../assets/img/sleep-search.jpg'
import decades from '../assets/img/decades-search.jpg'
import workout from '../assets/img/workout-search.jpg'
import party from '../assets/img/party-search.jpg'
import focus from '../assets/img/focus-search.jpg'
import alternativ from '../assets/img/alternativ-search.jpg'
import travel from '../assets/img/travel-search.jpg'
import soul from '../assets/img/soul-search.jpg'
import funk from '../assets/img/funk-search.jpg'
import metal from '../assets/img/metal-search.jpg'
import classical from '../assets/img/classical-search.jpg'
import blues from '../assets/img/blues-search.jpg'
export default function Search() {
    return (
        <section className='search'>
            <MainLayout>
                <form>
                    <input type='text' placeholder='Artists, songs or podcasts ' />
                </form>
                <div className='title'>Browser all</div>
                <div className='grid-container-search'>
                    <div classNam="grid-element-1" style={{ backgroundColor: 'rgb(141, 103, 171)' }}><span>pop</span>
                        <img src={pop} />
                    </div>
                    <div classNam="div3" style={{ backgroundColor: 'rgb(71, 125, 149)' }}><span>chill</span> <img src={chill} /></div>
                    <div classNam="div4" style={{ backgroundColor: 'rgb(175, 40, 150)' }} ><span>party</span><img src={party} /></div>
                    <div classNam="div5" style={{ backgroundColor: 'rgb(80, 55, 80)' }}><span>focus</span><img src={focus} /></div>
                    <div classNam="div6" style={{ backgroundColor: 'rgb(180, 155, 200)' }}><span>alternativ</span><img src={alternativ} /></div>
                    <div classNam="div14" style={{ backgroundColor: 'rgb(255, 200, 100)' }}><span>summer</span><img src={summer} /></div>
                    <div classNam="div7" style={{ backgroundColor: 'rgb(96, 129, 8)' }}><span>indie</span><img src={indie} /></div>
                    <div classNam="div19" style={{ backgroundColor: 'rgb(225, 51, 0)' }}><span>latin</span><img src={latin} /></div>
                    <div classNam="div8" style={{ backgroundColor: 'rgb(71, 125, 149)' }}><span>wellness</span><img src={wellness} /></div>
                    <div classNam="div9" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>sleep</span><img src={sleep} /></div>
                    <div classNam="div10" style={{ backgroundColor: 'rgb(186, 93, 7)' }}><span>decades</span><img src={decades} /></div>
                    <div classNam="div11" style={{ backgroundColor: 'rgb(119, 119, 119)' }}><span>workOut</span><img src={workout} /></div>
                    <div classNam="div12" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>at Home</span><img src={wellness} /></div>
                    <div classNam="div13" style={{ backgroundColor: 'rgb(45, 70, 185)' }}><span>travel</span><img src={travel} /></div>
                    <div classNam="div15" style={{ backgroundColor: 'rgb(220, 20, 140)' }}><span>soul</span><img src={soul} /></div>
                    <div classNam="div16" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>jazz</span><img src={jazz} /></div>
                    <div classNam="div17" style={{ backgroundColor: 'rgb(230, 30, 50)' }}><span>funk</span><img src={funk} /></div>
                    <div classNam="grid-element-2" style={{ backgroundColor: 'rgb(141, 103, 171)' }}><span>mood</span>
                        <img src={mood} /></div>
                    <div classNam="div18" style={{ backgroundColor: 'rgb(119, 119, 119)' }}><span>metal</span><img src={metal} /></div>
                    <div classNam="div20" style={{ backgroundColor: 'rgb(225, 51, 0)' }}><span>classical</span><img src={classical} /></div>
                    <div classNam="div21" style={{ backgroundColor: 'rgb(13, 115, 236)' }}><span>blues</span><img src={blues} /></div>
                    <span></span>
                </div>
            </MainLayout>
        </section>
    )
}
