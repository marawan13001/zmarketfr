
import React from 'react';

const TestImages = () => {
  // Tableau avec images locales fiables et images Unsplash fiables
  const testImages = [
    // Images d'Unsplash connues pour être fiables
    { name: 'Image Unsplash 1 (chat)', path: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901' },
    { name: 'Image Unsplash 2 (fruit)', path: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9' },
    { name: 'Image Unsplash 3 (robot)', path: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e' },
    
    // Logo qui semble fonctionner
    { name: 'Logo', path: '/lovable-uploads/672b581f-d176-4a85-8f3b-810bafe22f5c.png' },
    
    // Nouvelles images de poulet téléchargées
    { name: 'Poulet Vedina 1 (nouvelle)', path: '/lovable-uploads/df01b84c-0652-4bfe-89cc-5f7fa5e37f9f.png' },
    { name: 'Poulet Vedina 2 (nouvelle)', path: '/lovable-uploads/c4ca7c05-8562-4f98-b3d3-f0d9d0cb0b69.png' },
    
    // Images téléchargées problématiques (pour tester)
    { name: 'Image Poulet 1 (problématique)', path: '/lovable-uploads/4f4b89b1-20ef-4551-a295-eb2a696c41b9.png' },
    { name: 'Image Poulet 2 (problématique)', path: '/lovable-uploads/d099aa13-63d5-439f-81e1-e9f800a0c7d8.png' },
    { name: 'Image Poulet 3 (problématique)', path: '/lovable-uploads/c194056f-e3bd-4e9b-b007-acced086e6ca.png' },
    
    // Placeholder pour référence
    { name: 'Placeholder', path: '/placeholder.svg' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test des images</h1>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-amber-800">Informations importantes</h2>
        <p className="text-amber-700">
          Cette page affiche toutes les images disponibles pour tester leur chargement.
          Les images vertes sont chargées correctement, les rouges ont échoué.
          Les nouvelles images Vedina sont maintenant disponibles pour le site.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testImages.map((img, index) => (
          <div key={index} className="border rounded-lg p-4 relative">
            <h2 className="font-medium mb-2">{img.name}</h2>
            <p className="text-xs text-gray-500 mb-2 truncate">{img.path}</p>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
              <img 
                src={img.path} 
                alt={img.name} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error(`Failed to load: ${img.path}`);
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.parentElement?.classList.add("bg-red-50", "border", "border-red-200");
                  
                  // Ajouter un message d'erreur
                  const errorDiv = document.createElement('div');
                  errorDiv.className = "absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs py-1 px-2 text-center";
                  errorDiv.textContent = "Échec du chargement";
                  e.currentTarget.parentElement?.appendChild(errorDiv);
                }}
                onLoad={(e) => {
                  console.log(`Loaded: ${img.path}`);
                  e.currentTarget.parentElement?.classList.add("bg-green-50", "border", "border-green-200");
                  
                  // Ajouter un message de succès
                  const successDiv = document.createElement('div');
                  successDiv.className = "absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs py-1 px-2 text-center";
                  successDiv.textContent = "Chargée avec succès";
                  e.currentTarget.parentElement?.appendChild(successDiv);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex gap-4">
        <a href="/" className="text-brand-orange hover:underline">Retour à l'accueil</a>
        <a href="/test-images" className="text-blue-500 hover:underline">Rafraîchir la page</a>
      </div>
    </div>
  );
};

export default TestImages;
