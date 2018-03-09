import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SendingLetters extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render () {
        return (
            <div>Sending Letters</div>
        )
    }
}

export default withRouter(SendingLetters)