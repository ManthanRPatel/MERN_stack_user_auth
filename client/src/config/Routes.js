import axios from 'axios';
import Login from '../main/auth/Login'
import SignUp from '../main/auth/SignUp'
import Profile from '../main/profile/Profile'


export const serverBaseURL = 'http://localhost:5000/';
axios.defaults.baseURL = serverBaseURL;



export const UnAuthRoutes = [
    {
		path:'/login',
		component: Login
    },
    {
		path:'/signup',
		component: SignUp
	},
]

export const AuthRoutes = [
    {
		path:'/',
		component: Profile
    },
    // {
	// 	path:'/addEditPayment',
	// 	component:lazy(()=> import('app/main/login/LoginPage') )
	// },
]