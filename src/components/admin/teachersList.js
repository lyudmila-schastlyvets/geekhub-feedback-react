import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Teachers extends Component {

    render() {
        return (
            <div>
                <h1>Teachers</h1>
                <Link to='/add_teacher'>Add teacher</Link>
            </div>
        )
    }
}

export default withRouter(Teachers)