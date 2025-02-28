
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-brand-black">404</h1>
        <div className="w-20 h-1 bg-brand-orange mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-600 mb-8">
          Oops! La page que vous recherchez semble introuvable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-orange text-white font-medium transition-all hover:bg-brand-orange/90 hover:scale-105"
        >
          <ArrowLeft size={18} className="mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
