import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, User, ArrowLeft, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, signUp, isLoading, user, isConfirmingEmail } = useAuth();
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const isEmailConfirmation = location.search.includes('confirmation=true');
  const isProcessingConfirmation = location.search.includes('access_token');
  
  const defaultTab = location.search.includes('tab=register') ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const redirectTo = location.search.includes('redirect') ? location.search.split('redirect=')[1] : '/';
  
  useEffect(() => {
    if (isProcessingConfirmation || isConfirmingEmail) {
      return;
    }
    
    if (isEmailConfirmation) {
      return;
    }
    
    if (user) {
      if (redirectTo === 'commande') {
        navigate('/commande', { state: { from: 'auth' } });
      } else {
        navigate(redirectTo);
      }
    }
  }, [user, navigate, redirectTo, isEmailConfirmation, isConfirmingEmail, isProcessingConfirmation]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setRegistrationSuccess(false);
    const newUrl = value === 'register' 
      ? `${location.pathname}?tab=register${redirectTo !== '/' ? `&redirect=${redirectTo}` : ''}` 
      : `${location.pathname}${redirectTo !== '/' ? `?redirect=${redirectTo}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(registerEmail, registerPassword, registerFirstName, registerLastName);
      setRegistrationSuccess(true);
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterFirstName('');
      setRegisterLastName('');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (isConfirmingEmail || isProcessingConfirmation) {
    return (
      <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/3853021d-3d04-4065-b4c7-831fbaed557e.png" 
              alt="Logo" 
              className="h-24 w-auto"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Activation de votre compte</CardTitle>
              <CardDescription>Veuillez patienter pendant que nous activons votre compte</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Loader2 className="h-16 w-16 text-brand-orange animate-spin mb-4" />
              <p className="text-gray-600">Votre compte est en cours d'activation...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isEmailConfirmation) {
    return (
      <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/3853021d-3d04-4065-b4c7-831fbaed557e.png" 
              alt="Logo" 
              className="h-24 w-auto"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Email confirmé</CardTitle>
              <CardDescription>Votre adresse email a été confirmée avec succès</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Alert className="bg-green-50 border-green-200 mb-4">
                <Check className="h-5 w-5 text-green-600" />
                <AlertDescription className="text-green-700">
                  Votre compte a été activé. Vous pouvez maintenant vous connecter.
                </AlertDescription>
              </Alert>
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full bg-brand-orange hover:bg-brand-orange/90 font-medium transition-all"
              >
                Aller à la page de connexion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-brand-gray flex flex-col">
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2 py-12">
        <Link to="/" className="self-start flex items-center text-gray-700 mb-6 hover:text-brand-orange transition-colors">
          <ArrowLeft className="mr-2" size={16} />
          Retour à l'accueil
        </Link>
        
        <div className="w-full flex justify-center mb-6">
          <img 
            src="/lovable-uploads/3853021d-3d04-4065-b4c7-831fbaed557e.png" 
            alt="Logo" 
            className="h-20 w-auto"
          />
        </div>
        
        <Card className="w-full shadow-lg border-brand-orange/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center font-bold text-brand-dark">
              {activeTab === 'login' ? 'Connexion' : 'Créer un compte'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {activeTab === 'login' 
                ? 'Connectez-vous pour accéder à votre compte' 
                : 'Inscrivez-vous pour profiter de nos services'}
            </CardDescription>
            {redirectTo === 'commande' && (
              <div className="mt-2 text-center text-sm text-amber-600 bg-amber-50 p-2 rounded-md">
                Veuillez vous connecter ou créer un compte pour finaliser votre commande
              </div>
            )}
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="login" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
                Connexion
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
                Inscription
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        className="pl-10 border-gray-300 focus:border-brand-orange focus:ring-brand-orange"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
                      <a href="#" className="text-xs text-brand-orange hover:underline">
                        Mot de passe oublié?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-10 border-gray-300 focus:border-brand-orange focus:ring-brand-orange"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 font-medium transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              {registrationSuccess ? (
                <div className="p-6">
                  <Alert className="bg-green-50 border-green-200 mb-4">
                    <Check className="h-5 w-5 text-green-600" />
                    <AlertDescription className="text-green-700">
                      Inscription réussie ! Un email de confirmation a été envoyé à votre adresse email. 
                      Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.
                    </AlertDescription>
                  </Alert>
                  <Button 
                    onClick={() => handleTabChange('login')} 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 font-medium transition-all"
                  >
                    Aller à la page de connexion
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700">Prénom</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 text-gray-400" size={16} />
                          <Input 
                            id="firstName" 
                            placeholder="Prénom" 
                            className="pl-10 border-gray-300 focus:border-brand-orange focus:ring-brand-orange"
                            value={registerFirstName}
                            onChange={(e) => setRegisterFirstName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700">Nom</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Nom" 
                          className="border-gray-300 focus:border-brand-orange focus:ring-brand-orange"
                          value={registerLastName}
                          onChange={(e) => setRegisterLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registerEmail" className="text-gray-700">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                        <Input 
                          id="registerEmail" 
                          type="email" 
                          placeholder="votre@email.com" 
                          className="pl-10 border-gray-300 focus:border-brand-orange focus:ring-brand-orange"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registerPassword" className="text-gray-700">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                        <Input 
                          id="registerPassword" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-10 border-gray-300 focus:border-brand-orange focus:ring-brand-orange"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                          minLength={6}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Le mot de passe doit contenir au moins 6 caractères
                      </p>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-brand-orange hover:bg-brand-orange/90 font-medium transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </Button>
                  </CardFooter>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
