import React, {useState, useEffect} from 'react';
import Search from "./Search";
import {Link, useHistory} from "react-router-dom";
import CardBuilder from "./CardBuilder";

function MainPage(props){

    const [questions, setQuestions] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(10);
    const [filter, setFilter] = useState('');

    let history = useHistory();
    const handle = (filter) => history.push(`/questions?filter=${filter}`);

    const handleData = (limit, offset, filter) => {
        fetchQuestions(limit, offset, filter);
    }

    const fetchQuestions = async (limit, offset, filter) => {
        let res = await fetch(`https://private-anon-9ef6ff4cd7-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}${filter}`);
        const questionsData = await res.json();
        console.log(questionsData);
        setQuestions(questionsData);
    }

    useEffect(() => {
        fetchQuestions(limit, offset, props.location.search.replace('?', '&'))
    }, [props.location.search])

    return(
        <div>
            <Search handleData={handle}/>
            {questions.map((data, index) => {
                console.log(data.id);
                return(
                <Link to={`questions/${data.id}`}>
                    <CardBuilder key={index} cardData={data}/>
                </Link>
            )
                })}
        </div>
    )
}

export default MainPage;