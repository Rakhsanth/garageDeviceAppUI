// React related
import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiLink from '@material-ui/core/Link';
import { Dialog, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// Formik
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Redux and actions
import { connect } from 'react-redux';
import { registerUser } from '../actions';
// custom css file
// import styles from './login.module.css';
// Utils
import { validatePassword } from '../utils/formValidators';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20vh auto',
        maxWidth: 345,
        borderRadius: '1rem',
    },
    textFieldRoot: {
        marginBottom: '1rem',
        '& .MuiOutlinedInput-input': {
            padding: '1.1rem 1rem',
        },
    },
    btn: {
        padding: '1rem',
        marginBottom: '1rem',
    },
    title: {
        display: 'inline-block',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    links: {
        margin: '0 auto',
        cursor: 'pointer',
    },
}));

const initialValues = {
    userName: '',
    email: '',
    password: '',
    password2: '',
};
const validationSchema = Yup.object({
    userName: Yup.string().required('Username is mandatory'),
    email: Yup.string()
        .required('Email is mandatory')
        .email('Please provide a valid email'),
    password: Yup.string().test(
        'passwordValidator',
        'Password must have upper, lowercase, number, symbols and atleast 8 characters',
        (value) => validatePassword(value)
    ),
    password2: Yup.string().test(
        'validateConfirmPassword',
        'Confirm password must be same as password',
        function (value) {
            return value === this.parent.password;
        }
    ),
});

function Register(props) {
    const classes = useStyles();

    const { history, registerUser, loading, isLoggedIn } = props;

    const [isSubmitting, setisSubmitting] = useState(false);
    // console.log(isSubmitting);

    useEffect(() => {
        if (!loading && isLoggedIn) {
            history.replace('/');
        }
    }, [loading, isLoggedIn]);

    const onSubmit = (values, onSubmitProps) => {
        setisSubmitting(true);
        registerUser(values);
        setisSubmitting(false);
    };

    return (
        <Fragment>
            <Card className={classes.root}>
                <CardHeader
                    title={
                        <Typography variant="h5" className={classes.title}>
                            Register
                        </Typography>
                    }
                />
                <CardContent className={classes.cardContent}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(formik) => {
                            // console.log(formik);
                            return (
                                <Form className={classes.cardContent}>
                                    <Field name="userName">
                                        {({ field, form }) => {
                                            return (
                                                <TextField
                                                    {...field}
                                                    className={
                                                        classes.textFieldRoot
                                                    }
                                                    id="username"
                                                    label="Username"
                                                    type="search"
                                                    variant="outlined"
                                                    error={
                                                        formik.touched
                                                            .userName &&
                                                        Boolean(
                                                            formik.errors
                                                                .userName
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .userName &&
                                                        Boolean(
                                                            formik.errors
                                                                .userName
                                                        )
                                                            ? formik.errors
                                                                  .userName
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                    </Field>
                                    <Field name="email">
                                        {({ field, form }) => {
                                            return (
                                                <TextField
                                                    {...field}
                                                    className={
                                                        classes.textFieldRoot
                                                    }
                                                    id="email"
                                                    label="Email"
                                                    type="search"
                                                    variant="outlined"
                                                    error={
                                                        formik.touched.email &&
                                                        Boolean(
                                                            formik.errors.email
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched.email &&
                                                        Boolean(
                                                            formik.errors.email
                                                        )
                                                            ? formik.errors
                                                                  .email
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => {
                                            return (
                                                <TextField
                                                    className={
                                                        classes.textFieldRoot
                                                    }
                                                    {...field}
                                                    id="password"
                                                    label="Password"
                                                    type="password"
                                                    variant="outlined"
                                                    error={
                                                        formik.touched
                                                            .password &&
                                                        Boolean(
                                                            formik.errors
                                                                .password
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .password &&
                                                        Boolean(
                                                            formik.errors
                                                                .password
                                                        )
                                                            ? formik.errors
                                                                  .password
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                    </Field>
                                    <Field name="password2">
                                        {({ field, form }) => {
                                            return (
                                                <TextField
                                                    className={
                                                        classes.textFieldRoot
                                                    }
                                                    {...field}
                                                    id="password2"
                                                    label="Confirm Password"
                                                    type="password"
                                                    variant="outlined"
                                                    error={
                                                        formik.touched
                                                            .password2 &&
                                                        Boolean(
                                                            formik.errors
                                                                .password2
                                                        )
                                                    }
                                                    helperText={
                                                        formik.touched
                                                            .password2 &&
                                                        Boolean(
                                                            formik.errors
                                                                .password2
                                                        )
                                                            ? formik.errors
                                                                  .password2
                                                            : null
                                                    }
                                                />
                                            );
                                        }}
                                    </Field>
                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Register
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>

                    <Typography className={classes.links}>
                        <Link to="/login">
                            <MuiLink>
                                Already a user? Please login here !!!
                            </MuiLink>
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
            <Dialog
                className={classes.dialog}
                open={isSubmitting}
                aria-labelledby="simple-dialog-title"
            >
                <CircularProgress />
            </Dialog>
        </Fragment>
    );
}

const mapStateToProps = (store) => ({
    loading: store.auth.loading,
    isLoggedIn: store.auth.loggedIn,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
