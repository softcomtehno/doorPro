import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import ComparisonPage from './pages/ComparisonPage';
import { CartProvider } from './context/CartContext';
import { ComparisonProvider } from './context/ComparisonContext';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <ComparisonProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/comparison" element={<ComparisonPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ComparisonProvider>
      </CartProvider>
    </Router>
  );
}

export default App;