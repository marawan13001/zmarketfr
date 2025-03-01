
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import TestImages from "@/pages/TestImages";
import Commande from "@/pages/Commande";

function App() {
  return (
    <Router>
      <Toaster position="bottom-center" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/test-images" element={<TestImages />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
