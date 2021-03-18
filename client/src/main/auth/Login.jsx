import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Login(props) {

    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        user_email: Yup.string().email('Invalid email').required('Required'),
        user_password: Yup.string().required('Required'),
    });

    return (
        <div className={classes.root} >
            <Formik
                initialValues={{
                    user_email: '',
                    user_password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    axios.post('loginUser', {...values})
                    .then(res=>{
                        let { status, access_token } = res.data;
                        if( status ){
                            localStorage.setItem('jwt_access_token', access_token)
                        }
                        else{
                            console.log("login failed");
                        }
                    })
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, validateForm, getFieldProps }) => (
                    <Form onSubmit={handleSubmit} >
                        <TextField 
                            name='user_email' 
                            {...getFieldProps('user_email')} 
                            label="Email" 
                            variant="outlined"
                            error={touched.user_email && errors.user_email}
                        />
                        <ErrorMessage className="error_msg" name='user_email' />
                        <TextField 
                            name='user_password' 
                            {...getFieldProps('user_password')} 
                            label="Password" 
                            type='password'
                            variant="outlined"
                            error={touched.user_password && errors.user_password}
                        />
                        <ErrorMessage className="error_msg" name='user_password' />
                        <Button variant="contained" color="primary" type="submit">Login</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login;