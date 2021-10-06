import React from 'react';
import loader from '../assets/img/loader.svg'
export function Loading() {
    return (
        <div className='loading'>
            <img src={loader} />
        </div>
    )
}
