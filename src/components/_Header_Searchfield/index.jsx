import React, { useState, useEffect } from 'react'
import { Input, Form } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUsers, faCalendarDay, faHashtag } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
library.add(faUsers);
library.add(faCalendarDay);
library.add(faHashtag);

const SearchField = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [userResult, setUserResult] = useState([]);
    const [topicResult, setTopicResult] = useState([]);
    const [isLoadingResults, setIsLoadingResults] = useState(false);

    const searchQueryChangeHandler = (event) => {
        setSearchQuery(event.target.value)
        const controller = new AbortController();
        const { signal } = controller;

        if (event.target.value == "") {
            setUserResult([]);
            setTopicResult([]);
            setIsLoadingResults(false);
        } else {
            controller.abort();
            var tokenHeaders = new Headers()
            tokenHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    
            var requestOptions = {
                method: 'GET',
                headers: tokenHeaders,
                redirect: 'follow',
            }
    
            let popularItems = ''
    
            setIsLoadingResults(true);
    
            // eslint-disable-next-line no-undef
            fetch(process.env.REACT_APP_API_URL + '/api/search?query=' + event.target.value,requestOptions, { signal })
                .then((response) => response.json())
                .then((result) => {
                    let userResult = result[0];
                    let topicResult = result[1];
    
                    setUserResult(userResult);
                    setTopicResult(topicResult);
    
                    setIsLoadingResults(false);
                })
                .catch((error) => console.log('error', error))
        }


    }

    const searchFieldFocus = () => {
        document.querySelector('.SearchFieldBackdrop').classList.add('SearchFieldBackdrop-visible')
        document.querySelector('.SearchField-Results').classList.add('SearchField-Results-visible')
        document.querySelector('.SearchField').classList.add('SearchField-expanded')
    }
    const searchFieldFocusOut = () => {
        
        setTimeout(function(){
            if (document.querySelector('.SearchField').contains(document.activeElement) == false) {
                document.querySelector('.SearchFieldBackdrop').classList.remove('SearchFieldBackdrop-visible')
                document.querySelector('.SearchField-Results').classList.remove('SearchField-Results-visible')
                document.querySelector('.SearchField').classList.remove('SearchField-expanded')
            } else {
                searchFieldFocus();
            }
        },10)

    }
    
    return (
        <React.Fragment>
            <div className="SearchField" onBlur={searchFieldFocusOut}>
            
                <form>

                    <input value={searchQuery} onFocus={searchFieldFocus} onChange={searchQueryChangeHandler} placeholder="Search for colleagues, groups, events and more..." />
                    {isLoadingResults && (<span className="loader"></span>)}

                </form>

                <div className="SearchField-Results" tabIndex="0">
                    <ul>
                        {(userResult.length > 0) && (
                            <React.Fragment>
                                <span className="divider">Users</span>
                                {
                                    userResult.map((user) => {
                                        return (
                                            <li key={user.id}><a href="#"><FontAwesomeIcon icon="user" /> {user.name} <small>Rechtsabteilung</small></a></li>
                                        )
                                    })
                                }
                            </React.Fragment>
                        )}
                        {(topicResult.length > 0) && (
                            <React.Fragment>
                                <span className="divider">Topics</span>
                                {
                                    topicResult.map((topic) => {
                                        return (
                                            <li key={topic.id}><a href="#"><FontAwesomeIcon icon="hashtag" /> {topic.topic}</a></li>
                                        )
                                    })
                                }
                            </React.Fragment>
                        )}
                    </ul>
                </div>

            </div>
            <div className="SearchFieldBackdrop" onClick={searchFieldFocusOut}></div>
        </React.Fragment>
    )
}

export default SearchField