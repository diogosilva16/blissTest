import React, {useEffect, useState} from 'react';

function IndividualCard(props) {

    const [question, setQuestion] = useState([]);
    const questionId = props.match.params.id;

    const fetchQuestionInfo = async () => {
        let res = await fetch(`https://private-anon-9ef6ff4cd7-blissrecruitmentapi.apiary-mock.com/questions/${questionId}`);
        const questionsInfo = await res.json();
        setQuestion(questionsInfo);
        console.log(questionsInfo);
    }

    useEffect(() => {
        fetchQuestionInfo();
    }, [])

    return (
        <div>
            <img src={question.image_url} alt={question.id} />
            <p>{question.question}</p>
            <p>{question.published_at}</p>
            {question.choices.map((choices, key) => {
                return <div>
                    <button>{choices.choice}</button>
                    <p>{choices.votes}</p>
                </div>
            })}
        </div>
    )
}

export default IndividualCard;