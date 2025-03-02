
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdminLoginProps {
  password: string;
  setPassword: (password: string) => void;
  handleLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ password, setPassword, handleLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
          <p className="mt-2 text-gray-600">Veuillez vous connecter pour accéder au panneau d'administration</p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="mt-1">
              <Input
                id="password"
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
          </div>
          
          <div>
            <Button className="w-full" onClick={handleLogin}>
              Se connecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
