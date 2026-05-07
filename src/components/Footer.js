import { FiMail, FiPhone, FiHome, FiCoffee, FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-amber-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('aboutBrewBean')}</h3>
            <p className="text-amber-100">
              {t('aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiHome className="ltr:mr-2 rtl:ml-2" /> {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/menu" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiCoffee className="ltr:mr-2 rtl:ml-2" /> {t('menu')}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiShoppingCart className="ltr:mr-2 rtl:ml-2" /> {t('cart')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center text-amber-100 hover:text-white transition-colors">
                  <FiUser className="ltr:mr-2 rtl:ml-2" /> {t('profile')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contactUs')}</h3>
            <div className="space-y-2 text-amber-100">
              <div className="flex items-center">
                <FiMail className="ltr:mr-2 rtl:ml-2" />
                <span>ihsanaliaup@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="ltr:mr-2 rtl:ml-2" />
                <span dir="ltr">+92 3444947537</span>
              </div>
              <div className="flex ltr:space-x-4 rtl:space-x-reverse rtl:space-x-4 mt-4">
                <div className="flex ltr:space-x-4 rtl:space-x-reverse rtl:space-x-4 mt-4">
  <button type="button" className="text-2xl hover:text-white transition-colors cursor-default">
    <FaCcVisa />
  </button>
  <button type="button" className="text-2xl hover:text-white transition-colors cursor-default">
    <FaCcMastercard />
  </button>
  <button type="button" className="text-2xl hover:text-white transition-colors cursor-default">
    <FaCcPaypal />
  </button>
</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-800 mt-8 pt-6 text-center text-amber-200">
          <p>&copy; {new Date().getFullYear()} {t('brandName')}. {t('allRights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;