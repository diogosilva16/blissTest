import React from 'react';

function Choices(props) {

    const {choicesData} = props;

    return (
        <div>
            <p className='choiceBold'>{choicesData.choice}</p>
            <p>{choicesData.votes}</p>
        </div>
    )

}

export default Choices;