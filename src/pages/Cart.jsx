import React, { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiLock, FiArrowRight } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaGooglePay } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ cartItems, updateQuantity, removeFromCart, clearCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'shipping', 'payment', 'complete'
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const totalPrice = subtotal + shippingFee + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate processing delay
    setTimeout(() => {
      setCheckoutStep('shipping');
      setIsCheckingOut(false);
    }, 1500);
  };

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    // Simulate order processing
    setTimeout(() => {
      toast.success('Order placed successfully!');
      clearCart();
      setCheckoutStep('complete');
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
        <FiShoppingCart className="mr-2" /> 
        {checkoutStep === 'cart' ? 'Your Cart' : 
         checkoutStep === 'shipping' ? 'Shipping Information' :
         checkoutStep === 'payment' ? 'Payment Method' :
         'Order Confirmation'}
      </h2>

      {checkoutStep === 'complete' ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h3>
          <p className="text-gray-600 mb-6">Thank you for your purchase</p>
          <button
            onClick={() => setCheckoutStep('cart')}
            className="bg-amber-900 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-12">
          <FiShoppingCart className="mx-auto text-4xl text-amber-300 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-sm text-gray-400 mt-2">
            Add some delicious coffee from our menu!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Changes based on checkout step */}
          <div className="lg:col-span-2">
            {checkoutStep === 'cart' ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 last:border-b-0 p-4 flex">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-amber-900 font-medium">RS {item.price}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-amber-200 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 text-amber-900 hover:bg-amber-50 rounded-l-full"
                        >
                          <FiMinus />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 text-amber-900 hover:bg-amber-50 rounded-r-full"
                        >
                          <FiPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : checkoutStep === 'shipping' ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                <h4 className="text-lg font-semibold mb-4">Shipping Address</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded" rows="3"></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                <h4 className="text-lg font-semibold mb-4">Payment Method</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <input type="radio" id="credit-card" name="payment" defaultChecked />
                    <label htmlFor="credit-card" className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span>Credit/Debit Card</span>
                        <div className="flex space-x-2">
                          <FaCcVisa className="text-2xl text-blue-900" />
                          <FaCcMastercard className="text-2xl text-red-600" />
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <input type="radio" id="paypal" name="payment" />
                    <label htmlFor="paypal" className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span>PayPal</span>
                        <FaCcPaypal className="text-2xl text-blue-700" />
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <input type="radio" id="google-pay" name="payment" />
                    <label htmlFor="google-pay" className="flex-grow">
                      <div className="flex justify-between items-center">
                        <span>Google Pay</span>
                        <FaGooglePay className="text-2xl text-black" />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-800 font-medium">
                    RS {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 mb-3">
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">RS {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">
                  {shippingFee === 0 ? 'FREE' : `RS ${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="text-gray-800">RS {tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-amber-900">RS {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full bg-gradient-to-r from-amber-700 to-amber-900 text-white py-3 rounded-lg hover:from-amber-800 hover:to-amber-900 transition-colors font-medium flex items-center justify-center ${isCheckingOut ? 'opacity-70' : ''}`}
              >
                {isCheckingOut ? (
                  'Processing...'
                ) : (
                  <>
                    <FiLock className="mr-2" />
                    Proceed to Checkout
                    <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>
            ) : checkoutStep === 'shipping' ? (
              <button
                onClick={() => setCheckoutStep('payment')}
                className="w-full bg-amber-900 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors font-medium"
              >
                Continue to Payment
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={isCheckingOut}
                className={`w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium ${isCheckingOut ? 'opacity-70' : ''}`}
              >
                {isCheckingOut ? 'Placing Order...' : 'Place Order'}
              </button>
            )}

            {checkoutStep === 'cart' && (
              <p className="text-xs text-gray-500 mt-4 flex items-center">
                <FiLock className="mr-1" />
                Secure SSL Encryption
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;