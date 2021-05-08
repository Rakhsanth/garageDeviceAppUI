// GLobal CSS
import './App.css';

// React
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AlertWrapper from './utils/AlertWrapper';
import Footer from './components/Footer';
// Redux store and actions
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { loadUser, setAlert } from './actions';

// Redux presist related
import { PersistGate } from 'redux-persist/integration/react';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Header />
                    <AlertWrapper />
                    <ProtectedRoute exact path="/" component={Landing} />
                    <Switch>
                        {/* Other specific dynamic routes and pages goes here */}
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                    {/* <Footer /> */}
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
