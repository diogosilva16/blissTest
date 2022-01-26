import React, {useState, useEffect} from 'react';
import Search from "./Search";
import {useHistory} from "react-router-dom";
import CardBuilder from "./CardBuilder";
import Loading from "./Loading";
import ErrorHandle from "./ErrorHandle";

function MainPage(props) {

    const [questions, setQuestions] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(10);
    const [filter, setFilter] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);

    let history = useHistory();
    const handle = (filter) => history.push(`/questions?filter=${filter}`);

    const handleData = (limit, offset, filter) => {
        fetchQuestions(limit, offset, filter);
    }

    const fetchQuestions = async (limit, offset, filter) => {
        setLoading(true);
        setError(false);
        try {
            let res = await fetch(`https://private-anon-9ef6ff4cd7-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}${filter}`);
            const questionsData = await res.json();
            setQuestions(questionsData);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchQuestions(limit, offset, props.location.search.replace('?', '&'))
    }, [props.location.search])

    return (
        <div>
            {hasError && !isLoading && <ErrorHandle/>}
            {isLoading && <Loading/>}
            {!hasError && !isLoading && (
                <div>
                    <Search handleData={handle}/>
                    <div style={{textAlign: 'center'}}>
                        {questions.map((data, index) => {
                            return (
                                <CardBuilder key={index} cardData={data} id={data.id}/>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainPage;