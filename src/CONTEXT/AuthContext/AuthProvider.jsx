import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create User


    const createuser = ( email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword( auth, email, password);
    }

    // signIn USer

    const signIn = ( email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword( auth, email, password);
    }

        // LogOut User
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

        // SignIn with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
        // Update User Profile
    const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name, 
        photoURL: photo
    }).then(() => {
        setUser((prevUser) => ({
            ...prevUser,
            displayName: name,
            photoURL: photo
        }));
    
  });

}

    useEffect( () => {  
        const unsubscribe = onAuthStateChanged( auth,currentUser => {
            setUser(currentUser);
            setLoading(false);
        } );

        return () => {
            unsubscribe();
        };
    }, [] )

    const authInfo = {
        user,
        loading,
        createuser,
        signIn,
        logOut,
        signInWithGoogle,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value ={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;