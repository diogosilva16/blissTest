import React from 'react';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

function Connection(){

    return(
        <div className='noConnection centerInfo '>
            <SentimentDissatisfiedIcon className='iconSize'/>
            <h2>It seems like you've lost connection to the Internet!</h2>
            <p>This page will refresh once you have reestablished connection.</p>
        </div>
    )
}

export default Connection;