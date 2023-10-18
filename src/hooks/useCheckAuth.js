import { useDispatch, useSelector } from "react-redux";
import { fireBaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";
import { useEffect } from "react";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {


    const {status} = useSelector( state => state.auth );
    const dispath = useDispatch();
  
    useEffect(()=>{
  
      onAuthStateChanged( fireBaseAuth , async ( user) => {
         if( !user ) return dispath( logout());
  
         const { uid,email,displayName,photoURL} = user;
         dispath( login({uid,email,displayName,photoURL}));
         dispath( startLoadingNotes());
      })
  
    },[])

    return {
        status
    }

}
