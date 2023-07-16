import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import {firebase} from '../firebase/firebase';

function useAuthListener() {

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    useEffect(() =>{
        const listener = getAuth(firebase).onAuthStateChanged((authUser) =>{
            if(authUser){
                //we have a user therefore we can store it in local
                localStorage.setItem('authUser',JSON.stringify(authUser));
                setUser(authUser);
            }else{
                //we dont have authUser therefore clear it out.
               localStorage.removeItem('authUser');
               setUser(null);
            }
        })

        return () => listener();
    },[firebase]);
    
  return { user }
}

export default useAuthListener