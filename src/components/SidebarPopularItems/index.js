import React from 'react'
import './style.scss'
import { Placeholder, Icon } from 'semantic-ui-react'

class SidebarPopularItems extends React.Component {
    constructor() {
        super()
        this.state = { topics: [], isLoading: true }
    }

    componentDidMount() {
        var tokenHeaders = new Headers()
        tokenHeaders.append(
            'Authorization',
            'Bearer ' + localStorage.getItem('token')
        )

        var requestOptions = {
            method: 'GET',
            headers: tokenHeaders,
            redirect: 'follow',
        }

        let popularItems = ''

        fetch(
            // eslint-disable-next-line no-undef
            process.env.REACT_APP_API_URL + '/api/sidebar/popular',
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                this.setState({ topics: result, isLoading: false })
            })
            .catch((error) => console.log('error', error))
    }

    render() {
        return (
            <div className="topic-container">
                {this.state.isLoading ? (
                    <div>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                    </div>
                ) : (
                    this.state.topics.map((topic) => {
                        return (
                            <a
                                key={`topic-${topic.id}`}
                                className="topic-item"
                                href={`/app/topics/` + topic.topic}
                            >
                                <Icon name="hashtag" /> {topic.topic}
                            </a>
                        )
                    })
                )}
            </div>
        )
    }
}

export default SidebarPopularItems
