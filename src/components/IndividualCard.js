import React, {useEffect, useState} from 'react';

function IndividualCard(props) {

    console.log(props);
    const [question, setQuestion] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [questionUpdate, setQuestionUpdate] = useState(null);
    const questionId = props.match.params.id;
    console.log(questionId);

    const fetchQuestionInfo = async () => {
        let res = await fetch(`https://private-anon-9ef6ff4cd7-blissrecruitmentapi.apiary-mock.com/questions/${questionId}`);
        const questionsInfo = await res.json();
        setQuestion(questionsInfo);
        console.log(questionsInfo);
        (!question ? setLoading(true) : setLoading(false));
    }

    console.log(question);
    useEffect(() => {
        fetchQuestionInfo();
    }, [])

    const handleVote = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
        };
        let res = await fetch(`https://private-anon-38eb41df49-blissrecruitmentapi.apiary-mock.com/questions/${questionId}`, requestOptions);
        const data = await res.json();
        // setQuestionUpdate(data);
    }

    const share = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        let res = await fetch(`https://private-anon-38eb41df49-blissrecruitmentapi.apiary-mock.com/share?destination_email=destination_email&content_url=content_url`, requestOptions);
    }

    const pushHomepage = () => {
        props.history.push('/');
    };

    return (
        <div>
            <div className='back-homepage'>
                <button className='btn-sort' onClick={pushHomepage}>Back to homepage</button>
            </div>
            {isLoading && (<p>loading...</p>)}
            {!isLoading && (
                <div className='content'>
                    <div className='align-center'>
                        <div style={{borderBottomColor: 'black', borderBottomStyle: 'solid'}}>
                            <img src={question.image_url} alt={question.id}/>
                            <p>{question.question}</p>
                        </div>
                        <div className='grid grid-columns-4'>
                            {question.choices.map((choice) => {
                                return <div>
                                    <div>
                                        <button onClick={() => { handleVote() }}>{choice.choice}</button>
                                    </div>
                                    <div><p>{choice.votes}</p></div>
                                </div>

                            })}
                        </div>
                        <div className=''>
                            <p>Published at: {question.published_at.replace('T', ' ').replace('Z', '')}</p>
                            <button onClick={() => {}}>Share</button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

export default IndividualCard;