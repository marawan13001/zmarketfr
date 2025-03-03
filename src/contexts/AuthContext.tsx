
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
    // Vérifier si nous sommes sur une page de confirmation d'email
    const handleEmailConfirmation = async () => {
      // Récupérer les paramètres de l'URL
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('access_token');
      const tokenType = params.get('token_type');
      const type = params.get('type');
      const refreshToken = params.get('refresh_token');

      // Si nous avons les paramètres d'une confirmation d'email
      if (accessToken && type === 'signup') {
        setIsConfirmingEmail(true);
        try {
          // Échanger le token pour une session
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });
          
          if (error) throw error;
          
          // Email confirmé avec succès
          setSession(data.session);
          setUser(data.session?.user || null);
          toast.success("Email confirmé avec succès! Vous êtes maintenant connecté.");
          navigate('/');
        } catch (error: any) {
          toast.error(error.message || "Erreur lors de la confirmation de l'email");
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
      // D'abord vérifier si c'est une confirmation d'email
      const isEmailConfirmation = await handleEmailConfirmation();
      
      if (!isEmailConfirmation) {
        // Si ce n'est pas une confirmation d'email, obtenir la session normalement
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
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          navigate('/');
        } else if (event === 'SIGNED_OUT') {
          navigate('/auth');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      
      // Get the current origin
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
      // On ne redirige pas l'utilisateur après l'inscription, on affiche le message de confirmation
      // et on attend qu'il vérifie son email
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
