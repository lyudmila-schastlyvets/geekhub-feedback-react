import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Feedback extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render () {
        return (
            <div>
                <h1>Feedback</h1>
            </div>
        )
    }
}

export default withRouter(Feedback)