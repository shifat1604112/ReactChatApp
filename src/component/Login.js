import React from "react";
import {Button} from "@material-ui/core";
import "./Login.css";
import {auth, provider} from "../firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login(){

    const [{},dispatch] = useStateValue();

    const signin = () =>{
        //console.log("hereeeeeeeeee");
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user,
            });
        })
        .catch((error)=> alert(error.message));
    };

    return(
        <div className="login">
            <div className="login__container">
                <img src="https://png.pngtree.com/element_our/png/20181022/man-avatar-icon-professional-man-character-business-man-avatar-carton-symbol-png_206531.jpg" 
                alt=""/>
            
                <div className="login__tt">
                    <h1>  Sign in to Chat </h1>
                </div>

                <Button onClick={signin}>  Sign in with GOOGLE </Button>
            </div>
        </div>
    );
}

export default Login;