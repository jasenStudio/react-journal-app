import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { fireBaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {

    try {

        const result = await signInWithPopup( fireBaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const user = result.user;
        const {  displayName,email,photoURL,uid}  = user;

        return {
            ok:true,
            displayName,email,photoURL,uid
        }

    }catch( error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok:false,
            errorMessage
        }
        console.log(error)
    }
}

export const registerWithEmailPassword = async ({ email, password, displayName}) => {
    try {
        
        const resp = await createUserWithEmailAndPassword(fireBaseAuth,email,password);
        console.log(resp);
        const { uid,photoURL } = resp.user;

        await updateProfile(fireBaseAuth.currentUser,{ displayName });



        return {
            ok:true,
            uid,photoURL,email,displayName
        }


    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok:false,
            errorMessage
        }
    }
}


export const loginWithEmailPassword = async({email,password}) => {


    try {

        console.log(email,password)
        const response = await signInWithEmailAndPassword(fireBaseAuth,email,password);
        const user = response.user;

        const {  displayName,photoURL,uid}  = user;
       
        return {
            ok:true,
            uid,photoURL,displayName
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok:false,
            errorMessage
        }
    }
 

}


export const logoutFirebase = async () => {
    return await fireBaseAuth.signOut();
}