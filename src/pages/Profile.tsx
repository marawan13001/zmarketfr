
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
}

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    avatar_url: null
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          setProfileData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            avatar_url: data.avatar_url
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Erreur lors du chargement du profil');
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-gray py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link to="/" className="flex items-center text-gray-700 mb-6 hover:text-brand-orange transition-colors">
          <ArrowLeft className="mr-2" size={16} />
          Retour à l'accueil
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="md:w-1/3">
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  {profileData.avatar_url ? (
                    <AvatarImage src={profileData.avatar_url} alt={profileData.first_name} />
                  ) : (
                    <AvatarFallback className="bg-brand-orange/10 text-brand-orange">
                      <User size={40} />
                    </AvatarFallback>
                  )}
                </Avatar>
                <CardTitle className="text-xl text-center">{profileData.first_name} {profileData.last_name}</CardTitle>
                <CardDescription className="text-center">{profileData.email}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                onClick={handleLogout}
              >
                Se déconnecter
              </Button>
            </CardFooter>
          </Card>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Mon Profil</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles
                </CardDescription>
              </CardHeader>
              
              <Tabs defaultValue="profile">
                <div className="px-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="profile">Profil</TabsTrigger>
                    <TabsTrigger value="orders">Commandes</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="profile">
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input 
                          id="firstName" 
                          value={profileData.first_name}
                          onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input 
                          id="lastName" 
                          value={profileData.last_name}
                          onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profileData.email}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">
                        L'email ne peut pas être modifié
                      </p>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      onClick={handleUpdateProfile}
                      disabled={isLoading}
                      className="bg-brand-orange hover:bg-brand-orange/90"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="orders">
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-gray-500">Vous n'avez pas encore passé de commande</p>
                      <Link to="/#produits">
                        <Button className="mt-4 bg-brand-orange hover:bg-brand-orange/90">
                          Découvrir nos produits
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
