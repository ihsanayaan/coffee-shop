import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Link add kiya
import { FiHome, FiCoffee, FiShoppingCart, FiUser } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import './i18n';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [lang, setLang] = useState('en');

  const toggleLanguage = () => {
    const newLang = lang === 'en'? 'ar' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar'? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]); // dependency fix ki

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('brewbean-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('brewbean-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (itemId, change) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      if (!existingItem) return prev;
      const newQuantity = existingItem.quantity + change;
      if (newQuantity <= 0) {
        return prev.filter(item => item.id!== itemId);
      }
      return prev.map(item =>
        item.id === itemId? {...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id!== itemId));
  };

  const addToCart = (newItem, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
          ? {...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {...newItem, quantity }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar 
          lang={lang} 
          toggleLanguage={toggleLanguage} 
          t={t} 
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          totalCartItems={totalCartItems}
        />

        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu cartItems={cartItems} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        <nav className="bg-white border-t border-gray-200 py-4 shadow-inner md:block hidden">
          <div className="container mx-auto flex justify-around max-w-md">
            <Link to="/" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiHome className="text-xl mb-1" />
              <span className="text-xs md:text-sm">{t('home')}</span>
            </Link>
            <Link to="/menu" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiCoffee className="text-xl mb-1" />
              <span className="text-xs md:text-sm">{t('menu')}</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiShoppingCart className="text-xl mb-1" />
              <span className="text-xs md:text-sm">{t('cart')} ({totalCartItems})</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiUser className="text-xl mb-1" />
              <span className="text-xs md:text-sm">{t('profile')}</span>
            </Link>
          </div>
        </nav>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}
export default App;