import React, { useContext, useState } from 'react';
import Title from '../Components/Title';
import CartTotal from '../Components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PlaceOrder() {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
    useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    Street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  // handle form input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // handle form submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        items: orderItems,       // Array of items
        address: formData,       // Object with firstName, lastName, street, city, etc.
        amount: getCartAmount() + delivery_fee
      };

      switch (paymentMethod) {
        case 'cod': {
          const response = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case 'stripe': {
          const responseStripe = await axios.post(
            backendUrl + '/api/order/place',
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        default:
          toast.error('Please select a payment method');
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSelect = (method) => {
    setPaymentMethod(method);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[600px]">
        <div className="text-xl sm:text-2xl my-3 w-full">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />

          <div className="flex gap-3 mt-4">
            <input
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First Name"
            />
            <input
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-6"
            type="email"
            placeholder="Email address"
          />
          <input
            onChange={onChangeHandler}
            name="Street"
            value={formData.Street}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-6"
            type="text"
            placeholder="Street"
          />

          <div className="flex gap-3 mt-4">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <input
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Zipcode"
            />
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full mt-6"
            type="number"
            placeholder="Phone"
          />
        </div>
      </div>

      {/* Right Side - Cart Total & Payment Method */}
      <div className="mt-8 min-w-80 w-full sm:max-w-[640px]">
        <CartTotal />

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            {/* Stripe Option */}
            <div
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${paymentMethod === 'stripe' ? 'border-green-400 bg-green-50' : ''
                }`}
              onClick={() => handleSelect('stripe')}
            >
              <div
                className={`w-4 h-4 border rounded-full ${paymentMethod === 'stripe' ? 'bg-green-400' : 'bg-white'
                  }`}
              ></div>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe logo" />
            </div>

            {/* Cash on Delivery Option */}
            <div
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${paymentMethod === 'cod' ? 'border-green-400 bg-green-50' : ''
                }`}
              onClick={() => handleSelect('cod')}
            >
              <div
                className={`w-4 h-4 border rounded-full ${paymentMethod === 'cod' ? 'bg-green-400' : 'bg-white'
                  }`}
              ></div>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

