import React from 'react';

function CheckHealth(){
    return(
        <div className={"serverHealth centerInfo"}>
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" cx="33" cy="33" r="30"/>
            </svg>
            <p>Checking server health...</p>
        </div>
    )
}

export default CheckHealth;