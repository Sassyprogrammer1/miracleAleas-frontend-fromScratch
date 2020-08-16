import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
const axios = require('axios');



const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
}

function AuthProvider(props) {
  console.log("ASdasas")
  const history = useHistory();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  


  const signUp = useCallback(async (email,password,confirmPassword)=>{
  
    // Send create account request
    
    const resp = await fetch('http://localhost:8080/api/userSignup', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      headers:{
        "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
      },
      body: new URLSearchParams({  
        email:email,  
        password:password,
        confirmPassword:confirmPassword  
      }) 
    });
    const newResp = await resp.json()
    console.log('newResp', newResp)
    console.log(email, password);
    // console.log(email, password);
  
    history.push('/login');
  }, [history]);
  

  
  const logIn = useCallback(async (email, password) => {
    // Send login request
    console.log("mmail",email)                                                                                                                                                                                                                                                                                                                       
   
    const resp = await fetch('http://localhost:8080/api/userLogin', {
      method: 'POST',
      cache: 'no-cache',
      mode: 'cors',
      headers:{
        "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json",
        "Accept-Charset": "utf-8"
      },
      body: new URLSearchParams({  
        email:email,  
        password:password,  
      }) 
    });
    const newResp = await resp.json() 
    console.log('newResp', newResp)
    console.log(email, password);
    
      setUser({
        email,
        avatarUrl: defaultUser.avatarUrl
      });
    
    history.push('/home');
    
  }); 

  const logOut = useCallback(() => {
    // Clear user data

    setUser();
  }, []);

  useEffect(() => {
    // Retrieve and save user data on initial load

    setUser(defaultUser);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn,signUp,logOut, loading }} {...props} />
  );
}

export { AuthProvider, useAuth }
