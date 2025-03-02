
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Commande from './pages/Commande';
import NotFound from './pages/NotFound';
import TestImages from './pages/TestImages';
import Admin from './pages/Admin';
import { Toaster } from './components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/test-images" element={<TestImages />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <SonnerToaster position="bottom-center" closeButton />
    </Router>
  );
}

export default App;
