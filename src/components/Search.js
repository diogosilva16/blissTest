import React, {useState} from 'react';

function Search({handleData}) {

    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('');

    const updateInput = e => {
        e.preventDefault();
        setQuery(e.target.value);
        setFilter(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        handleData(filter);
    }

    return (
        <div className="searchBox">
            <form onSubmit={handleSubmit}>
                <input placeholder={"Search..."} type="input" name="searchbar" onChange={updateInput}
                       value={query}/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search;