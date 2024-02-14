import React, { useEffect, useState } from "react";
import "../Styles/Header.css";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


 import {jwtDecode} from 'jwt-decode';

const customStyle = {
    content: {
        height: '400px',
        width: '300px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '30px',
        marginRight: '-30%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: 'lightblue',
        border: '2px solid blue'
    }
}

const Header = () => {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [SignupModalIsOpen, setSignupModalIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInfo, setLoginInfo] = useState([]);
    const [signUpInfo, setSignUpInfo] = useState([]);
    // const [login, setLogin] = useState(false);
    const [glogin,setGlogin]=useState(false);

    const location = useLocation();
    const [background, setBackground] = useState('red');
    // let [display, setDisplay] = useState();

    useEffect(() => {
        if (location.pathname === "/") {
            setBackground("rgba(0,0,0,0.80)");
        }
        else {
            setBackground("red");
        }

    }, [location.pathname]);

    const handleLogin = () => {
        setLoginModalIsOpen(true)
    }

    const handleCancel = () => {
        setLoginModalIsOpen(false)
    }

    const handleSignup = () => {
        setSignupModalIsOpen(true)
    }

    const handleSignupCancel = () => {
        setSignupModalIsOpen(false)
    }

    const logOut=()=>{
        googleLogout();
        setGlogin(false)
    }

    const Signup = () => {
        const Data = { username: username, email: email, password: password };
        axios
          .post("http://localhost:1900/register", Data)
          .then((response) => {
            setSignUpInfo(response.data);
            console.log(signUpInfo);
          })
          .catch((error) => {
            console.error("Error occured", error);
            handleSignupCancel();
          });
      };

    // const Signup = () => {
    //     const Data = { username: username, email: email, password: password};
    //     axios.post("http://localhost:1900/register", Data)
    //         .then((response) =>{
    //             setSignUpInfo(response.data),
    //             console.log(signUpInfo)      
    //             
    // })
    //         .catch((error) => {
    //             console.error("Error occured")
    //             handleSignupCancel()

    //         });
    // }

  
    
    const Login = () => {
        axios
          .post("https://outstanding-fish-pleat.cyclic.app/login", { email: email, password: password })
          .then((response) => {
            setLoginInfo(response.data.user);
            console.log(loginInfo, "successfully loggedin");
            setGlogin(true);
            setUsername(response.data.user.username);
            console.log(username);
            handleCancel();
          })
          .catch((err) => {
            console.error("Failed to Loggin");
            handleCancel();
          });
      };


    // const targetName=(e)=>{
    //     setUsername(e.target.value)
    // }

    const googleResponse =(credentialResponse)=> {
        setGlogin(true)
       var result= jwtDecode(credentialResponse.credential)
      setUsername(result.given_name);
      console.log(username);
        // setLoginModalIsOpen(false);
    }

    // const GoogleLogin=useGoogleLogin({
    //     onSuccess:async(response)=>{
    //         try{
    //             const res=await axios.get(
    //                 "https://www.googleapis.com/oauth2/v3/userInfo",
    //                 {
    //                     headers:{
    //                         Authorization:`Bearer ${response.access_token}`,
    //                     },
    //                 }
    //             );
    //             console.log(res);
    //         } catch(err){
    //             console.log(err);
    //         }
    //     }
    // });


    return (
        <>
            <div className="Header" style={{ backgroundColor: background }}>
                <div className="Hlogo">
                    <p>P2P</p></div >
              
               {!glogin ? 
                <div class="buttons">
                   
                <button class="btn text-white fw-bold mlogin text-center" onClick={handleLogin}>Login </button>
                <button class="btn text-white bg-transparent fw-bold acc" onClick={handleSignup}>Sign-Up</button>
                </div>:
                 <div class="buttons">
                 <button class="btn text-white fw-bold mlogin">{username}</button>
                 <button class="btn text-white bg-transparent fw-bold acc" onClick={logOut}>LogOut</button>
             </div>
            }

                <Modal isOpen={loginModalIsOpen}
                    style={customStyle}>

                    <div class="d-flex flex-column">
                        <h2>Login</h2>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-2 rounded-3 mb-2 bg-body" placeholder="Email" /><br />
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-2 rounded-3 mb-2 bg-body" placeholder="Password" /><br />

                        <div>
                            
                            <button onClick={Login} className="btn btn-outline-primary border-2 rounded-3 mb-2" >Login</button><br /> 
                            <button onClick={handleCancel} className="btn btn-outline-danger border-2 rounded-3 mb-2 w-80" >Cancel</button>
                        </div>

                        <div style={{ textAlign: 'center', justifyContent:'center'}} >
                            <GoogleOAuthProvider clientId="266753497257-gp8g495ush8r8c6js037lqrcs7c978cr.apps.googleusercontent.com">
                                <GoogleLogin
                                    onSuccess={googleResponse}
                                    onError={googleResponse}
                                />
                            </GoogleOAuthProvider>
                        </div></div>
                </Modal>


                <Modal isOpen={SignupModalIsOpen}
                    style={customStyle}>

                    <div className="signUp row g-3 ">
                        <h2>Sign-Up</h2>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-2 rounded-3 mb-2 bg-body" placeholder="UserName" /> <br />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-2 rounded-3 mb-2 bg-body" placeholder="Enter your email" /> <br />
                        <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-2 rounded-3 mb-2 bg-body" placeholder="Password" />

                        <div>
                            <button onClick={Signup} className="btn btn-outline-primary border-2 rounded-3 mb-2 ">Sign-Up</button><br /><br />
                            <button onClick={handleSignupCancel} className="btn btn-outline-danger border-2 rounded-3 mb-2 w-80">Cancel</button>
                            <br />
                            {/* <input type="checkbox" /> By creating an account you agree to our Terms & Privacy. */}
                        </div></div>
                </Modal>

            </div>
        </>
    )
}
export default Header;
