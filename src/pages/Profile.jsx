import React, { useState } from 'react';
import { FiUser, FiEdit, FiSave, FiClock, FiLock, FiAward } from 'react-icons/fi';
import { FaCoffee } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Profile = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [userData, setUserData] = useState({
    name: 'Coffee Lover',
    email: 'user@brewbean.com',
    phone: '+92 3444947537',
    address: 'Tighak Kabal Swat',
    password: ''
  });

  const [preferences, setPreferences] = useState({
    favoriteDrink: 'Latte',
    milkType: 'Oat Milk',
    sugarLevel: 'Medium',
    cupSize: 'Large',
    loyaltyPoints: 1250
  });

  const [orders] = useState([
    { id: 1001, date: '2023-06-15', items: ['Latte', 'Cappuccino'], total: 650, status: 'Delivered' },
    { id: 1002, date: '2023-06-10', items: ['Cold Brew', 'Croissant'], total: 420, status: 'Delivered' },
    { id: 1003, date: '2023-06-05', items: ['Caramel Macchiato'], total: 380, status: 'Cancelled' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success(t('profileUpdated'));
  };

  const handleSavePreferences = () => {
    setIsEditingPreferences(false);
    toast.success(t('preferencesUpdated'));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-amber-500 flex items-center">
            <FiUser className="ltr:mr-2 rtl:ml-2" /> {t('myProfile')}
          </h2>
          <div className="flex items-center ltr:space-x-4 rtl:space-x-reverse rtl:space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => isEditing? handleSave() : setIsEditing(true)}
              className="flex items-center bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
            >
              {isEditing? <FiSave className="ltr:mr-1 rtl:ml-1" /> : <FiEdit className="ltr:mr-1 rtl:ml-1" />}
              {isEditing? t('saveProfile') : t('editProfile')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-lg shadow-md p-6 ${darkMode? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center ltr:space-y-4 sm:ltr:space-y-0 sm:ltr:space-x-6 rtl:space-y-4 sm:rtl:space-y-0 sm:rtl:space-x-reverse sm:rtl:space-x-6 mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500">
                    {profileImage? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${darkMode? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <FiUser className="text-3xl text-amber-500" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-amber-600">
                      {t('upload')}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-500">{userData.name}</h3>
                  <div className="flex items-center mt-2">
                    <FiAward className="text-amber-400 ltr:mr-1 rtl:ml-1" />
                    <span className="text-sm">{preferences.loyaltyPoints} {t('loyaltyPoints')}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <FaCoffee className="text-amber-400 ltr:mr-1 rtl:ml-1" />
                    <span className="text-sm">{t('goldMember')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('fullName')}</label>
                  {isEditing? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    />
                  ) : (
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'}>{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('email')}</label>
                  {isEditing? (
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    />
                  ) : (
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'}>{userData.email}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('phoneNumber')}</label>
                  {isEditing? (
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      dir="ltr"
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    />
                  ) : (
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'} dir="ltr">{userData.phone}</p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('address')}</label>
                  {isEditing? (
                    <input
                      type="text"
                      name="address"
                      value={userData.address}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    />
                  ) : (
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'}>{userData.address}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex items-center">
                    <FiLock className={`ltr:mr-2 rtl:ml-2 ${darkMode? 'text-gray-400' : 'text-gray-500'}`} />
                    <div className="flex-grow">
                      <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('changePassword')}</label>
                      <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                        placeholder={t('enterNewPassword')}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order History */}
            <div className={`rounded-lg shadow-md p-6 ${darkMode? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-lg font-bold text-amber-500 mb-4 flex items-center">
                <FiClock className="ltr:mr-2 rtl:ml-2" /> {t('orderHistory')}
              </h3>
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className={`p-4 rounded-lg ${darkMode? 'bg-gray-700' : 'bg-amber-50'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">#{order.id}</p>
                        <p className="text-sm opacity-70">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'Delivered'? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {t(order.status.toLowerCase())}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{order.items.join(', ')}</p>
                    <p className="font-bold text-amber-600">{t('currency')}: {order.total}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className={`rounded-lg shadow-md p-6 h-fit sticky top-4 ${darkMode? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-amber-500">{t('coffeePreferences')}</h3>
              <button
                onClick={() => isEditingPreferences? handleSavePreferences() : setIsEditingPreferences(true)}
                className="text-sm bg-amber-100 text-amber-900 px-3 py-1 rounded-full hover:bg-amber-200"
              >
                {isEditingPreferences? t('save') : t('edit')}
              </button>
            </div>

            <div className="space-y-4">
              {isEditingPreferences? (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('favoriteDrink')}</label>
                    <select
                      name="favoriteDrink"
                      value={preferences.favoriteDrink}
                      onChange={handlePreferenceChange}
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    >
                      <option value="Latte">{t('latte')}</option>
                      <option value="Cappuccino">{t('cappuccino')}</option>
                      <option value="Espresso">{t('espresso')}</option>
                      <option value="Americano">{t('americano')}</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('milkType')}</label>
                    <select
                      name="milkType"
                      value={preferences.milkType}
                      onChange={handlePreferenceChange}
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    >
                      <option value="Regular Milk">{t('regularMilk')}</option>
                      <option value="Oat Milk">{t('oatMilk')}</option>
                      <option value="Almond Milk">{t('almondMilk')}</option>
                      <option value="Soy Milk">{t('soyMilk')}</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('sugarLevel')}</label>
                    <select
                      name="sugarLevel"
                      value={preferences.sugarLevel}
                      onChange={handlePreferenceChange}
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    >
                      <option value="None">{t('none')}</option>
                      <option value="Low">{t('low')}</option>
                      <option value="Medium">{t('medium')}</option>
                      <option value="High">{t('high')}</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('cupSize')}</label>
                    <select
                      name="cupSize"
                      value={preferences.cupSize}
                      onChange={handlePreferenceChange}
                      className={`w-full p-2 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none ltr:text-left rtl:text-right ${darkMode? 'bg-gray-700 border-gray-600' : 'bg-white border-amber-200'}`}
                    >
                      <option value="Small">{t('small')}</option>
                      <option value="Medium">{t('medium')}</option>
                      <option value="Large">{t('large')}</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('favoriteDrink')}</label>
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'}>{t(preferences.favoriteDrink.toLowerCase())}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('milkPreference')}</label>
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'}>{t(preferences.milkType.toLowerCase().replace(' ', ''))}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('sugarLevel')}</label>
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'}>{t(preferences.sugarLevel.toLowerCase())}</p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode? 'text-gray-300' : 'text-gray-700'}`}>{t('cupSize')}</label>
                    <p className={darkMode? 'text-gray-100' : 'text-gray-800'}>{t(preferences.cupSize.toLowerCase())}</p>
                  </div>
                </>
              )}

              {/* Loyalty Points */}
              <div className={`mt-6 p-4 rounded-lg ${darkMode? 'bg-gray-700' : 'bg-amber-50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiAward className="text-amber-500 ltr:mr-2 rtl:ml-2" />
                    <span className="font-medium">{t('loyaltyPoints')}</span>
                  </div>
                  <span className="font-bold text-amber-600">{preferences.loyaltyPoints}</span>
                </div>
                <div className="mt-2">
                  <div className={`h-2 rounded-full ${darkMode? 'bg-gray-600' : 'bg-amber-200'}`}>
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{ width: `${Math.min(100, (preferences.loyaltyPoints / 1500) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 ltr:text-right rtl:text-left">
                    {1500 - preferences.loyaltyPoints} {t('pointsToNextReward')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;