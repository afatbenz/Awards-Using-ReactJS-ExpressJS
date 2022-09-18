import React,{useState,useEffect} from 'react'
import {Input} from 'reactstrap'
import { useNavigate } from 'react-router';
import axios from 'axios'
import '../assets/css/style.css'
import starIcon from '../assets/img/starLogo.png'

const Home = ()=>{
    const navigate = useNavigate([])
    const [email, setEmail] = useState([])

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate("/")
        }
    },[])
    const SignIn = async ()=>{
        const response = await axios.post('http://localhost:3100/api/auth/login', {email})
        if(response.status === 200){
            localStorage.setItem("user-info", JSON.stringify(response.data))
            navigate("/awards")
        }
    }
    return(
        <div className="wrapper d-flex align-items-stretch">
            <div id="content" className="p-4 p-md-5 pt-5 fullwidth">
                <img src={starIcon} alt="Logo" />;
				<h1 className="mb-4 title">AWARD</h1>
                <p>Enter your email adress <br/>To Sign and Continue</p>
                <div className='input-group'>
                        <Input type="text" className="form-control" placeholder="Your email here ..." id="username" onChange={(e)=>setEmail(e.target.value)} autoFocus required />
                </div>
                <button onClick={SignIn} className="btn btn-dark btn-full">Sign In</button>
			</div>
        </div>       
    )
}

export default Home;