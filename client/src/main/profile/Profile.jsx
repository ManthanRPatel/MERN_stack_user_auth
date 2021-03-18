import React,{ useEffect, useState } from 'react'
import axios from 'axios';


const authAx = axios.create({
    baseURL: 'http://localhost:5000/',
    headers:{
        authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`
    }
})

function Profile() {

    const [profileInformation, setprofileInformation] = useState(null);

    useEffect(()=>{
        authAx.get('getUser').then(res=>{
            let { status, data } = res.data
            if( status ){
                setprofileInformation(data);
            }
        })
        return()=>{
            setprofileInformation(null);
        }
    },[])

    console.log(profileInformation);

    return (
        <div>
            {profileInformation &&(
                <>
                <img src={'http://localhost:5000/profile_pic/'+profileInformation.profile_pic} />
                    <div>
                        Name is: {' '}
                        {profileInformation.user_name}
                    </div>
                    <div>
                        Email is: {' '}
                        {profileInformation.user_email}
                    </div>
                </>
            )}
        </div>
    )
}

export default Profile;