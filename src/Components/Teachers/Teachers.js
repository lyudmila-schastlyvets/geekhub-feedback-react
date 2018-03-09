import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Teachers extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render () {
        return (
            <div>Teachers</div>
        )
    }
}

export default withRouter(Teachers)