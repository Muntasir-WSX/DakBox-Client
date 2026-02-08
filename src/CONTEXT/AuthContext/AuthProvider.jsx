import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createuser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        return signOut(auth);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo
        });
    }

    const [userRole, setUserRole] = useState(null);
const [roleLoading, setRoleLoading] = useState(true);

useEffect(() => {
    if (user?.email) {
        setRoleLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/user-role?email=${user.email}`, {
            headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
        })
        .then(res => {
            setUserRole(res.data.role);
            setRoleLoading(false);
        })
    } else {
        setRoleLoading(false);
    }
}, [user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current User State:', currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        userRole,
        roleLoading,
        loading,
        createuser,
        signIn,
        logOut,
        signInWithGoogle,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;