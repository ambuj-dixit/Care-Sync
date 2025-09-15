import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser, clearUser, setLoading, setError } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          phoneNumber: firebaseUser.phoneNumber,
          role: 'user' as const, // Default role, can be updated from database
          isVerified: firebaseUser.emailVerified,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
      dispatch(setLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const register = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };
};