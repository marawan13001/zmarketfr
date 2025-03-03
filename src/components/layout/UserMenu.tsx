
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, LogIn, UserPlus } from 'lucide-react';

const UserMenu = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/auth" className="hidden md:block">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <LogIn size={16} />
            <span>Connexion</span>
          </Button>
        </Link>
        <Link to="/auth?tab=register" className="hidden md:block">
          <Button size="sm" className="flex items-center gap-1 bg-brand-orange hover:bg-brand-orange/90">
            <UserPlus size={16} />
            <span>S'inscrire</span>
          </Button>
        </Link>
        <Link to="/auth" className="md:hidden">
          <Button variant="ghost" size="sm" className="p-2">
            <LogIn size={20} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <User size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            Mon profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/commande" className="cursor-pointer">
            Mes commandes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
