import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

// customize MUI
const useStyles = makeStyles((theme) => ({
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            width: '3rem',
            height: '3rem',
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
    },
}));

function ProtectedRoute(props) {
    const classes = useStyles();

    const { component: Component, loading, loggedIn, ...rest } = props;

    return !loading ? (
        <Route
            {...rest}
            render={(props) =>
                loggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    ) : (
        <Dialog
            className={classes.dialog}
            open={true}
            aria-labelledby="simple-dialog-title"
        >
            <CircularProgress />
        </Dialog>
    );
}

const mapStateToProps = (store) => ({
    loading: store.auth.loading,
    loggedIn: store.auth.loggedIn,
});

export default connect(mapStateToProps)(ProtectedRoute);
