import axios from 'axios';
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    // post form values to API
    const res = await axios.post('/api/surveys', values);
    // post successful?
    // redirect user back to /surveys
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};
