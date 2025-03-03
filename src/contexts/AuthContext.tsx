
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isConfirmingEmail: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmingEmail, setIsConfirmingEmail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle email confirmation
    const handleEmailConfirmation = async () => {
      // Get URL parameters
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('access_token');
      const tokenType = params.get('token_type');
      const type = params.get('type');
      const refreshToken = params.get('refresh_token');

      // If we have email confirmation parameters
      if (accessToken && (type === 'signup' || type === 'recovery' || type === 'invite')) {
        setIsConfirmingEmail(true);
        try {
          // Exchange token for a session
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });
          
          if (error) throw error;
          
          // Email confirmed successfully
          setSession(data.session);
          setUser(data.session?.user || null);
          
          if (type === 'signup') {
            toast.success("Email confirmé avec succès! Votre compte est maintenant activé.");
          } else if (type === 'recovery') {
            toast.success("Email de récupération confirmé.");
          } else if (type === 'invite') {
            toast.success("Invitation acceptée avec succès.");
          }
          
          // Clear URL parameters and redirect to home page
          window.history.replaceState({}, document.title, window.location.pathname);
          navigate('/');
        } catch (error: any) {
          toast.error(error.message || "Erreur lors de la confirmation de l'email");
          navigate('/auth');
        } finally {
          setIsConfirmingEmail(false);
          setIsLoading(false);
        }
        return true;
      }
      return false;
    };

    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true);
      // First check if this is an email confirmation
      const isEmailConfirmation = await handleEmailConfirmation();
      
      if (!isEmailConfirmation) {
        // If not an email confirmation, get session normally
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          // Don't navigate if we're already handling email confirmation
          if (!isConfirmingEmail) {
            navigate('/');
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/auth');
        } else if (event === 'USER_UPDATED') {
          // Handle user updates (like email confirmations)
          toast.info("Votre profil a été mis à jour");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, isConfirmingEmail]);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      
      // Get the current origin for dynamic redirect URL
      const origin = window.location.origin;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${origin}/auth?confirmation=true`,
        },
      });

      if (error) throw error;
      
      toast.success("Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte.");
    } catch (error: any) {
      toast.error(error.message || "Une erreur s'est produite lors de l'inscription");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("Connexion réussie!");
    } catch (error: any) {
      toast.error(error.message || "Une erreur s'est produite lors de la connexion");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.info("Vous êtes déconnecté");
    } catch (error: any) {
      toast.error(error.message || "Une erreur s'est produite lors de la déconnexion");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    isConfirmingEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
