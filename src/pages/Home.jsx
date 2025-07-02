import React from 'react';
import { FiCoffee } from 'react-icons/fi';

const Home = () => {
  const popularCoffees = [
    { id: 1, name: 'Latte', price: 350, image: '/images/latte.jpg' },
    { id: 2, name: 'Cappuccino', price: 300, image: '/images/cappuccino.jpg' },
    { id: 3, name: 'Espresso', price: 250, image: '/images/espresso.jpg' },
    { id: 4, name: 'Americano', price: 280, image: '/images/americano.jpg' },
    { id: 5, name: 'Mocha', price: 380, image: '/images/mocha.jpg' },
    { id: 6, name: 'Macchiato', price: 320, image: '/images/macchiato.jpg' },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-amber-800 mb-8 md:mb-10 lg:text-3xl text-center relative py-2">
        <span className="relative z-10 px-4 bg-gradient-to-r from-amber-200 via-amber-50 to-amber-200 rounded-full py-1 shadow-inner border border-amber-200">
          Popular Coffee
        </span>
        <span className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent transform -translate-y-1/2"></span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {popularCoffees.map((coffee) => (
          <div 
            key={coffee.id} 
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-green-800"
          >
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <img 
                src={coffee.image} 
                alt={coffee.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold mb-1 text-gray-800">{coffee.name}</h3>
              <p className="text-amber-900 font-medium text-lg">RS: {coffee.price}</p>
              <a 
                href="/menu" 
                className="inline-block mt-4 text-amber-900 hover:text-amber-700 font-medium text-sm hover:underline"
              >
                <FiCoffee className="inline mr-1" />
                View in Menu
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;