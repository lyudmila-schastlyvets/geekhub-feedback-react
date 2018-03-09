import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Feedback extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render () {
        return (
            <div>Feedback</div>
        )
    }
}

export default withRouter(Feedback)