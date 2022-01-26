import React, {useEffect, useRef, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';

function BuildModal(props) {

    const node = useRef();
    const [email, setEmail] = useState('');
    const url = props.url;

    const updateInput = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const share = async (email, url) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        let res = await fetch(`https://private-anon-38eb41df49-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=localhost:3000${url}`, requestOptions);

        console.log(email);
    }

    const handleClick = () => {
        share(email, url);
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <div className="share-wrap">
                    <span className='close' onClick={() => {
                        props.openPortal()
                    }}>&times;</span>
                    <h2>Share this page!</h2>
                    <div className="form">
                        <input type="text" placeholder="E-mail" name="email" value={email} onChange={updateInput}/>
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuildModal;