import { connect } from 'react-redux'
import {changeStateProps} from '../../actions'
import Teachers from './Teachers'

const mapStateToProps = (state, ownProps) => {
    return {
        teacher: state.main.teacher,
        errors: state.main.errors,
        ...ownProps
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeStateProps: (prop, value) => {
            dispatch(changeStateProps(prop, value))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(Teachers)