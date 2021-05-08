// React related
import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
// Redux related
import { connect } from 'react-redux';
import { getDevices } from '../actions';
// Material UI components
import {
    Button,
    Card,
    Grid,
    makeStyles,
    Typography,
    ButtonBase,
    Dialog,
    CircularProgress,
} from '@material-ui/core';
import MUILink from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

// API related
import axios from 'axios';
import { apiBaseURL } from '../config/config';

import styles from './componentCss.css';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '5rem',
        marginBottom: '5rem',
        minHeight: '20rem',
        width: '95vw',
        backgroundColor: 'white',
        boxShadow: '0.25rem 0.25rem 3rem #B4B4B4',
        borderRadius: '1rem',
        [theme.breakpoints.down('xs')]: {
            marginTop: '1rem',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: 'none',
        },
    },
    card: {
        borderRadius: '1rem',
        padding: '1rem',
        width: '95%',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
        },
    },
    title: {
        marginLeft: '0.5rem',
        fontSize: '1.1rem',
    },
    btn: {
        marginLeft: '1rem',
    },
    deleteButton: {
        padding: '0.5rem',
        backgroundColor: '#9A0036',
        marginLeft: 'auto',
        borderRadius: '50%',
    },
    deleteIcon: {
        fill: 'white',
    },
    addIcon: {
        position: 'fixed',
        bottom: '5vh',
        right: '5%',
        backgroundColor: '#E0E0E0',
        padding: '0.5rem',
        borderRadius: '50%',
    },
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            width: '3rem',
            height: '3rem',
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
    },
}));

function Landing(props) {
    const classes = useStyles();

    const {
        history,
        loading,
        loadingNotes,
        isLoggedIn,
        user,
        userId,
        getDevices,
        devices,
    } = props;

    useEffect(() => {
        if (!isLoggedIn) {
            history.replace('/login');
        }
    }, [loading, isLoggedIn]);
    useEffect(() => {
        if (userId !== undefined) {
            getDevices();
        }
    }, [loadingNotes, userId]);

    // util for deciding what button to render
    const renderCheckInOutButton = (device) => {
        if (device.isCheckedout) {
            if (userId === device.lastCheckedoutBy) {
                return (
                    <Button variant="contained" color="default">
                        Check In
                    </Button>
                );
            } else {
                return (
                    <Button variant="outlined" color="default" disabled>
                        Checked Out
                    </Button>
                );
            }
        } else {
            return (
                <Button variant="contained" color="default">
                    Check Out
                </Button>
            );
        }
    };

    const handleNoteDelete = async (deviceId) => {
        // await deleteDevice(deviceId);
        // getDevices(null, 'all');
    };
    const handleAddButton = () => {};

    return (
        <Fragment>
            <Container className={classes.container}>
                <Grid container spacing={3}>
                    {loadingNotes ? (
                        <Dialog
                            className={classes.dialog}
                            open={loadingNotes}
                            aria-labelledby="simple-dialog-title"
                        >
                            <CircularProgress />
                        </Dialog>
                    ) : devices.count !== 0 ? (
                        devices.devices.map((device) => {
                            // console.log(note._id);
                            return (
                                <Grid
                                    key={device._id}
                                    item
                                    sm={12}
                                    md={4}
                                    container
                                >
                                    <Card className={classes.card}>
                                        <Grid
                                            item
                                            sm={12}
                                            container
                                            direction="column"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <Typography
                                                    className={classes.title}
                                                    variant="h6"
                                                >
                                                    {device.device}
                                                </Typography>
                                            </Grid>
                                            <Grid item container>
                                                {renderCheckInOutButton(device)}
                                                {device.user === userId ? (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.btn}
                                                    >
                                                        Edit
                                                    </Button>
                                                ) : null}
                                                {device.user === userId ? (
                                                    <ButtonBase
                                                        className={
                                                            classes.deleteButton
                                                        }
                                                        onClick={() =>
                                                            handleNoteDelete(
                                                                device._id
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon
                                                            className={
                                                                classes.deleteIcon
                                                            }
                                                        />
                                                    </ButtonBase>
                                                ) : null}
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            );
                        })
                    ) : (
                        <Typography variant="h6">
                            No created notes yet !!!
                        </Typography>
                    )}
                </Grid>
                {devices.count < 10 ? (
                    <ButtonBase
                        className={classes.addIcon}
                        onClick={handleAddButton}
                    >
                        <AddIcon
                            color="primary"
                            style={{ width: '3rem', height: '3rem' }}
                        />
                    </ButtonBase>
                ) : null}
            </Container>
        </Fragment>
    );
}

const mapStateToProps = (store) => ({
    loading: store.auth.loading,
    isLoggedIn: store.auth.loggedIn,
    user: store.auth.user,
    userId: store.auth.user._id,
    loadingNotes: store.devices.loading,
    devices: store.devices,
});

export default connect(mapStateToProps, { getDevices })(withRouter(Landing));
