import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SignInButton: React.FC = () => {
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      // Debug: Log the client ID to make sure it's being read
      console.log('Google Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
      console.log('Current origin:', window.location.origin);
      
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (loading) {
    return (
      <button className="btn-secondary btn-md" disabled>
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {user.image && (
          <img 
            src={user.image} 
            alt={user.name} 
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="text-sm font-medium text-gray-700">
          {user.name}
        </span>
        <button 
          onClick={handleSignOut}
          className="btn-secondary btn-sm"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleGoogleSignIn}
      className="btn-primary btn-md"
    >
      Sign in with Google
    </button>
  );
};

export default SignInButton; 