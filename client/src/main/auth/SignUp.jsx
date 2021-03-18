import React,{ useState, useEffect } from 'react';
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

function SignUp(props) {

    const classes = useStyles();

    const [profilePic, setProfilePic] = useState(null)

    const validationSchema = Yup.object().shape({
        user_email: Yup.string().email('Invalid email').required('Email Required'),
        user_name: Yup.string().required('Name Required'),
        user_password: Yup.string().required('Password Required'),
    });

    useEffect(() => {
        return () => {
            setProfilePic(null)
        }
    }, [])

    return (
        <div className={classes.root} >
            <Formik
                initialValues={{
                    user_email: '',
                    user_password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {

                    let formData = new FormData();
                    formData.append('profile_pic', profilePic[0] )
                    formData.append('user_email', values.user_email )
                    formData.append('user_password', values.user_password )
                    formData.append('user_name', values.user_name )

                    axios.post('registerUser', formData )
                    .then(res=>{
                        let { status, access_token } = res.data;
                        if( status ){
                            console.log("SignUp success");
                        }
                        else{
                            console.log("SignUp failed");
                        }
                    })
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, validateForm, getFieldProps }) => (
                    <Form onSubmit={handleSubmit} >

                        <TextField 
                            name='user_name' 
                            {...getFieldProps('user_name')} 
                            label="Name"
                            type='text'
                            variant="outlined"
                            error={touched.user_name && errors.user_name}
                        />
                        <ErrorMessage className="error_msg" name='user_name' />

                        <TextField 
                            name='user_email' 
                            {...getFieldProps('user_email')} 
                            label="Email" 
                            type='email'
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

                        <input type='file' name='profile_pic' onChange={e=> setProfilePic(e.target.files)} />
                        <Button variant="contained" color="primary" type="submit">SignUp</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUp;