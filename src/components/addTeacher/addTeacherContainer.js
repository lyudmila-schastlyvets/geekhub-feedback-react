import { connect } from 'react-redux'
import { changeStateProps } from '../../actions'
import addTeacher from './addTeacher'

const mapStateToProps = (state, ownProps) => {
    return {
        someTeacher: state.main.teacher,
        someErrors: state.main.errors,
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
    mapDispatchToProps)(addTeacher)