import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    // Using DidMount makes it clear that data won’t be loaded until after the initial render.
    // This reminds you to set up initial state properly,
    // so you don’t end up with undefined state that causes errors.

    // If you ever need to render your app on the server (SSR/isomorphic/other buzzwords),
    // componentWillMount will actually be called twice – once on the server, and again on the client –
    // which is probably not what you want.
    // Putting the data loading code in componentDidMount
    // will ensure that data is only fetched from the client.
    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        );
    }
}
// connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component);
// https://medium.com/mofed/reduxs-mysterious-connect-function-526efe1122e4
export default connect(null, actions)(App);