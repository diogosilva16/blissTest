import React, {useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import Choices from "./Choices";

function CardBuilder(props) {

    const {cardData} = props;
    const {id} = props;
    /* const handleRedirect = () => {
         props.history.replace(`questions/${cardData.id}`)
     }*/

    const imgSrc = cardData.image_url;

    return (
        <Link className='ref-cards' to={`questions/${id}`}>
            <div className='card'>
                <div className='card-holder'>
                    <img className='card-img' src={imgSrc} alt={cardData.id}/>
                </div>
                <div className='card-title'>
                    <h3>{cardData.question}</h3>
                </div>
            </div>
        </Link>
    )
}

export default withRouter(CardBuilder);