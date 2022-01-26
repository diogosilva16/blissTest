import React, {useState} from 'react';

function BuildModal(props) {

    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');

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
        try {
            let res = await fetch(`https://private-anon-38eb41df49-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=localhost:3000${url}`, requestOptions);
            if (!res.ok) {
                throw new Error(res.error.statusText);
            }
        } catch (error) {
            throw error;
        }
    }

    const handleClick = async () => {
        try {
            await share(email, url);
        } catch (error) {
            setErrorText(error);
        }
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
                        <input type="email" placeholder="E-mail" name="email" value={email} onChange={updateInput}
                               required/>
                        <button onClick={handleClick}>Share</button>
                    </div>
                    {!errorText.length ? null :
                        <div className="error-message centerInfo">{errorText}</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BuildModal;