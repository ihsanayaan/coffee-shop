import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiHome, FiCoffee, FiUser } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
        return prev.filter(item => item.id !== itemId);
      }

      return prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addToCart = (newItem, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...newItem, quantity }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-amber-900 text-white shadow-lg relative">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-2xl focus:outline-none"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <h1 className="text-3xl font-bold text-center md:text-4xl absolute left-1/2 transform -translate-x-1/2">
              BrewBean
            </h1>

            <Link to="/cart" className="text-2xl relative">
              <FiShoppingCart />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-amber-800 py-4 px-6">
              <nav className="flex flex-col space-y-4">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center text-white">
                  <FiHome className="mr-2" /> Home
                </Link>
                <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="flex items-center text-white">
                  <FiCoffee className="mr-2" /> Menu
                </Link>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center text-white">
                  <FiShoppingCart className="mr-2" /> Cart
                </Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center text-white">
                  <FiUser className="mr-2" /> Profile
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/menu" 
              element={<Menu cartItems={cartItems} addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cartItems={cartItems} 
                  updateQuantity={updateQuantity} 
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              } 
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Bottom Navigation (Desktop) */}
        <nav className="bg-white border-t border-gray-200 py-4 shadow-inner md:block hidden">
          <div className="container mx-auto flex justify-around max-w-md">
            <Link to="/" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiHome className="text-xl mb-1" />
              <span className="text-xs md:text-sm">Home</span>
            </Link>
            <Link to="/menu" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiCoffee className="text-xl mb-1" />
              <span className="text-xs md:text-sm">Menu</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiShoppingCart className="text-xl mb-1" />
              <span className="text-xs md:text-sm">Cart ({totalCartItems})</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center text-amber-900 font-medium px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors">
              <FiUser className="text-xl mb-1" />
              <span className="text-xs md:text-sm">Profile</span>
            </Link>
          </div>
        </nav>

        {/* Footer - Appears on all pages */}
        <Footer />

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;