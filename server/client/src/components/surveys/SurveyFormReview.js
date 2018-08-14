import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    return(
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat"
                    onClick={onCancel}>Back
                <i className="material-icons right">navigate_before</i>
            </button>
            <button className="green btn-flat right white-text"
                    // submitSurvey is called: submitSurvey(formValues)
                    // do not call submitSurvey till user clicked: () => submitSurvey(formValues)
                    onClick={() => submitSurvey(formValues, history)}>Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapMapStateToProps = ( state ) => {
    //console.log(state);
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapMapStateToProps, actions)(withRouter(SurveyFormReview));