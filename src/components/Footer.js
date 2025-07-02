import { FiMail, FiPhone, FiHome, FiCoffee, FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About BrewBean</h3>
            <p className="text-amber-100">
              Crafting the finest coffee experiences since 2023. Our beans are ethically sourced and freshly roasted.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiHome className="mr-2" /> Home
                </a>
              </li>
              <li>
                <a href="/menu" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiCoffee className="mr-2" /> Menu
                </a>
              </li>
              <li>
                <a href="/cart" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiShoppingCart className="mr-2" /> Cart
                </a>
              </li>
              <li>
                <a href="/profile" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiUser className="mr-2" /> Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2 text-amber-100">
              <div className="flex items-center">
                <FiMail className="mr-2" />
                <span>ihsanaliaup@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="mr-2" />
                <span>+92 3444947537</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-2xl hover:text-white transition-colors">
                  <FaCcVisa />
                </a>
                <a href="#" className="text-2xl hover:text-white transition-colors">
                  <FaCcMastercard />
                </a>
                <a href="#" className="text-2xl hover:text-white transition-colors">
                  <FaCcPaypal />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-800 mt-8 pt-6 text-center text-amber-200">
          <p>&copy; {new Date().getFullYear()} BrewBean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;