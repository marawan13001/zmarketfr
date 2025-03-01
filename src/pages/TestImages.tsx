
import React from 'react';

const TestImages = () => {
  const testImages = [
    { name: 'Background', path: '/lovable-uploads/b0be503c-11d2-44a7-8671-5efe375b1a53.png' },
    { name: 'Logo', path: '/lovable-uploads/672b581f-d176-4a85-8f3b-810bafe22f5c.png' },
    { name: 'Food1', path: '/lovable-uploads/7566ebde-6f4f-485f-b523-2037183b002d.png' },
    { name: 'Food2', path: '/lovable-uploads/119b6b0a-b379-4049-aaaa-e05b38872e88.png' },
    { name: 'New Image', path: '/lovable-uploads/3e55cb01-3d97-4335-ba30-1e75eb3dacfd.png' },
    { name: 'Placeholder', path: '/placeholder.svg' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test des images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testImages.map((img, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h2 className="font-medium mb-2">{img.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{img.path}</p>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={img.path} 
                alt={img.name} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error(`Failed to load: ${img.path}`);
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.parentElement?.classList.add("bg-red-50");
                }}
                onLoad={() => console.log(`Loaded: ${img.path}`)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <a href="/" className="text-brand-orange hover:underline">Retour à l'accueil</a>
      </div>
    </div>
  );
};

export default TestImages;
