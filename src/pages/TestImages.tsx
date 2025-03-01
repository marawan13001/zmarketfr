
import React from 'react';

const TestImages = () => {
  // Tableau avec images locales et images Unsplash fiables
  const testImages = [
    { name: 'Nouvelle image 1 (Poulet)', path: '/lovable-uploads/4f4b89b1-20ef-4551-a295-eb2a696c41b9.png' },
    { name: 'Nouvelle image 2 (Poulet)', path: '/lovable-uploads/d099aa13-63d5-439f-81e1-e9f800a0c7d8.png' },
    { name: 'Nouvelle image 3 (Poulet)', path: '/lovable-uploads/c194056f-e3bd-4e9b-b007-acced086e6ca.png' },
    { name: 'Logo', path: '/lovable-uploads/672b581f-d176-4a85-8f3b-810bafe22f5c.png' },
    { name: 'Background (ancienne image)', path: '/lovable-uploads/5154d0c7-e869-45f5-8efe-75432bed9d86.png' },
    { name: 'Unsplash 1 (fallback)', path: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e' },
    { name: 'Unsplash 2 (fallback)', path: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901' },
    { name: 'Placeholder', path: '/placeholder.svg' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test des images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testImages.map((img, index) => (
          <div key={index} className="border rounded-lg p-4 relative">
            <h2 className="font-medium mb-2">{img.name}</h2>
            <p className="text-sm text-gray-500 mb-2 truncate">{img.path}</p>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src={img.path} 
                alt={img.name} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error(`Failed to load: ${img.path}`);
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.parentElement?.classList.add("bg-red-50");
                  // Ajouter un texte d'erreur
                  const errorDiv = document.createElement('div');
                  errorDiv.className = "text-red-500 text-xs absolute bottom-2 left-2 right-2 text-center";
                  errorDiv.textContent = "Erreur de chargement";
                  e.currentTarget.parentElement?.appendChild(errorDiv);
                }}
                onLoad={(e) => {
                  console.log(`Loaded: ${img.path}`);
                  e.currentTarget.parentElement?.classList.add("bg-green-50");
                  // Ajouter un texte de succès
                  const successDiv = document.createElement('div');
                  successDiv.className = "text-green-500 text-xs absolute bottom-2 left-2 right-2 text-center";
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
