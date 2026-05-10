import { FiMenu, FiShoppingCart, FiX, FiGlobe } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar({ lang, toggleLanguage, t, isMenuOpen, setIsMenuOpen, totalCartItems }) {
  return (
    <header 
      className="bg-amber-900 text-white shadow-lg sticky top-0 z-50" 
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        
        {/* Left: Hamburger - Mobile only */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo - Desktop pe left, Mobile pe center */}
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-bold absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          {t('brandName')}
        </Link>

        {/* Right: Links + Lang + Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Desktop Links - Wapas right side pe */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-amber-200">{t('home')}</Link>
            <Link to="/menu" className="hover:text-amber-200">{t('menu')}</Link>
            <Link to="/cart" className="hover:text-amber-200">{t('cart')}</Link>
            <Link to="/profile" className="hover:text-amber-200">{t('profile')}</Link>
          </div>
          
          {/* Language Button - Mobile + Desktop, Full Text */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold border border-amber-500 transition-all"
          >
            <FiGlobe size={16} />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Cart Icon */}
          <Link to="/cart" className="text-2xl relative">
            <FiShoppingCart />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu - Lang button nahi hai */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-800 py-4 px-6 space-y-3 border-t border-amber-700">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-center hover:bg-amber-700 rounded"
          >
            {t('home')}
          </Link>
          <Link 
            to="/menu"
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 text-center hover:bg-amber-700 rounded"
          >
            {t('menu')}
          </Link>
          <Link 
            to="/cart"
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 text-center hover:bg-amber-700 rounded"
          >
            {t('cart')} ({totalCartItems})
          </Link>
          <Link 
            to="/profile"
            onClick={() => setIsMenuOpen(false)} 
            className="block py-2 text-center hover:bg-amber-700 rounded"
          >
            {t('profile')}
          </Link>
        </div>
      )}
    </header>
  );
}