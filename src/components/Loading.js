import React from 'react';

function Loading(){
    return(
        <div className={"centerInfo serverHealth"}>
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33"
                        r="30"></circle>
            </svg>
            <p>Loading...</p>
        </div>
    )
}

export default Loading;