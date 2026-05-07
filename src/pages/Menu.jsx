import React, { useState } from 'react';
import { FiCoffee, FiPlus, FiMinus, FiSearch, FiStar} from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const Menu = ({ addToCart }) => {
  const { t } = useTranslation();

  const menuCategories = [
    {
      id: 1,
      name: t('hotCoffee'),
      items: [
        { id: 101, name: t('espresso'), price: 10, description: t('espressoDesc'), rating: 4.5, isPopular: true },
        { id: 102, name: t('americano'), price: 15, description: t('americanoDesc'), rating: 4.2 },
        { id: 103, name: t('cappuccino'), price: 20, description: t('cappuccinoDesc'), rating: 4.7, isPopular: true },
        { id: 104, name: t('latte'), price: 30, description: t('latteDesc'), rating: 4.8, isPopular: true },
      ]
    },
    {
      id: 2,
      name: t('icedCoffee'),
      items: [
        { id: 201, name: t('icedAmericano'), price: 15, description: t('icedAmericanoDesc'), rating: 4.3 },
        { id: 202, name: t('icedLatte'), price: 20, description: t('icedLatteDesc'), rating: 4.6, isPopular: true },
        { id: 203, name: t('coldBrew'), price: 30, description: t('coldBrewDesc'), rating: 4.4 },
      ]
    },
    {
      id: 3,
      name: t('specialtyDrinks'),
      items: [
        { id: 301, name: t('caramelMacchiato'), price: 25, description: t('caramelMacchiatoDesc'), rating: 4.9, isPopular: true },
        { id: 302, name: t('mocha'), price: 15, description: t('mochaDesc'), rating: 4.5 },
        { id: 303, name: t('hazelnutLatte'), price: 30, description: t('hazelnutLatteDesc'), rating: 4.3 },
      ]
    }
  ];

  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query
  const filteredItems = menuCategories
  .find(cat => cat.id === activeCategory)
  ?.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => ({
    ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
    toast.success(`${quantity} ${item.name} ${t('addedToCart')}`);
    setQuantities(prev => ({...prev, [item.id]: 0 }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-amber-900">
          {t('ourMenu')}
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute ltr:left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchDrinks')}
            className="ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4 py-2 w-full rounded-full border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 ltr:text-left rtl:text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <div className="flex ltr:space-x-2 rtl:space-x-reverse rtl:space-x-2">
          {menuCategories.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                ? 'bg-amber-900 text-white'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      {filteredItems.length > 0? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col ${
                item.isPopular? 'ltr:border-l-4 rtl:border-r-4 border-amber-500' : ''
              }`}
            >
              {/* Popular Tag */}
              {item.isPopular && (
                <div className="absolute top-0 ltr:right-2 rtl:left-2 bg-amber-100 text-amber-900 px-2 py-1 rounded-full text-xs flex items-center z-10">
                  <FiStar className="ltr:mr-1 rtl:ml-1" /> {t('popular')}
                </div>
              )}

              <div className="p-5 flex-grow flex flex-col">
                {/* Item Info */}
                <div className="flex justify-between items-start">
                  <div className="flex-grow ltr:pr-2 rtl:pl-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-amber-900 font-medium text-lg whitespace-nowrap">
                    {t('currency')} {item.price}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex justify-center my-4">
                  <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                    <div className="flex text-amber-400 ltr:mr-2 rtl:ml-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${
                            i < Math.floor(item.rating)
                            ? 'fill-current'
                              : 'stroke-current'
                          } ${i < item.rating? 'text-amber-400' : 'text-gray-300'}`}
                          size={14}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-amber-800 font-medium">
                      {item.rating}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-amber-200 rounded-full">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-2 text-amber-900 hover:bg-amber-50 ltr:rounded-l-full rtl:rounded-r-full"
                        disabled={!quantities[item.id]}
                      >
                        <FiMinus />
                      </button>
                      <span className="px-3 text-sm font-medium">
                        {quantities[item.id] || 0}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-2 text-amber-900 hover:bg-amber-50 ltr:rounded-r-full rtl:rounded-l-full"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button
                      className="bg-amber-900 text-white px-4 py-2 rounded-full hover:bg-amber-800 transition-colors text-sm disabled:opacity-50"
                      onClick={() => handleAddToCart(item)}
                      disabled={quantities[item.id] === 0}
                    >
                      {t('addToCartBtn')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FiCoffee className="mx-auto text-4xl text-amber-300 mb-4" />
          <p className="text-gray-500">{t('noItemsFound')}</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-amber-900 hover:underline"
          >
            {t('clearSearch')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;