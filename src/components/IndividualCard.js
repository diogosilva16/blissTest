import React, {useEffect, useState} from 'react';
import Portal from "../utils/Portal";
import BuildModal from "./BuildModal";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Loading from "./Loading";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorHandle from "./ErrorHandle";

function IndividualCard(props) {

    const [question, setQuestion] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [portalOpen, setPortalOpen] = useState(false);
    const [hasError, setError] = useState(false);
    const questionId = props.match.params.id;

    const fetchQuestionInfo = async () => {
        setError(false);
        try {
            let res = await fetch(`https://private-anon-9ef6ff4cd7-blissrecruitmentapi.apiary-mock.com/questions/${questionId}`);
            const questionsInfo = await res.json();
            setQuestion(questionsInfo);
            setLoading(false)
        } catch (error){
            setError(error);
        }
        setLoading(!question);
    }

    useEffect(() => {
        fetchQuestionInfo();
    }, [])

    const handleVote = (choice) => async (e) => {
        e.preventDefault();
        const updatedQuestion = {
            ...question,
            choices: question.choices.map(c => c.choice === choice.choice ? {...c, votes: c.votes + 1} : c)
        }

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedQuestion)
        }
        let res = await fetch(`https://private-anon-38eb41df49-blissrecruitmentapi.apiary-mock.com/questions/${questionId}`, requestOptions);
        const data = await res.json();
        setQuestion(updatedQuestion)
    }

    const pushHomepage = () => {
        props.history.push('/');
    };

    const openPortal = () => {
        setPortalOpen(!portalOpen);
    }

    return (
        <div className={portalOpen ? 'blurr-bg' : ''}>
            {hasError && !isLoading && <ErrorHandle />}
            {isLoading && <Loading/>}
            {!isLoading && !hasError && (
                <div className='content'>
                    <div className='back-homepage'>
                        <button className='btn-sort' onClick={pushHomepage}><ArrowBackIosIcon className='arrowStyle'/>Go back</button>
                    </div>
                    <div>
                        <div className='align-center'>
                            <div>
                                <img src={question.image_url} alt={question.id}/>
                            </div>
                            <div>
                                <p className='individualTitle'>{question.question}</p>
                                <span className='favText'>Click on your favourite!</span>
                            </div>
                            <div className='grid grid-columns-4'>
                                {question.choices.map((choice) => {
                                    return <div>
                                        <div>
                                            <p className='choiceText'>{choice.choice}</p>
                                            <button className='choiceBtn' onClick={handleVote(choice)}><ThumbUpIcon className='iconStyle'/></button>
                                        </div>
                                        <div><p>{choice.votes} <span className="favText">votes</span></p></div>
                                    </div>
                                })}
                            </div>
                            <div className='details'>
                                <button onClick={openPortal}>Share</button>
                                {portalOpen &&
                                    <Portal id='modal-root'>
                                        <BuildModal openPortal={openPortal} url={props.match.url}/>
                                    </Portal>
                                }
                                <p className='publishedText'>Published at: {question.published_at.replace('T', ' ').replace('Z', '')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default IndividualCard;