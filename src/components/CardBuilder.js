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
        <Link to={`questions/${id}`}>
            <div className='card'>
                <section className='centerInfo'>
                    <img src={imgSrc} alt={cardData.id}/>
                    <h4>{cardData.question}</h4>
                    {/* <p>Published at: {cardData.published_at}</p>*/}
                    <div className='grid grid-columns-2'>
                        {cardData.choices.map((choices, index) => {
                            return <Choices key={index} choicesData={choices}/>
                        })}
                    </div>
                </section>

            </div>
        </Link>
    )
}

export default withRouter(CardBuilder);