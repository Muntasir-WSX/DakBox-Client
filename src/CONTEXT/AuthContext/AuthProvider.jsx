import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';

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

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
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
        logOut
    };

    return (
        <AuthContext value ={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;