import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import moment from 'moment-timezone';
import CheckOutContent from './store/CheckOutContent';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Listing from './Components/Listing/Listing';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import Contact from './Pages/Contact';
import Admin from './Pages/Admin';
import AdminClients from './Pages/AdminClients';
import Layout from './Components/Layout/Layout';
import AdminBanner from './Components/AdminBanner/AdminBanner';
import ForgetPassword from './Pages/ForgetPassword';
import AdminProducts from './Pages/AdminProducts';
import Testing from './Components/Testing/Testing';

function App() {
  const oNmber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(
      3,
      '0'
    );
    const orderNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return orderNumber;
  };

  const initialCartData = {
    order_number: oNmber(),
    items: [],
    date: moment().tz('America/New_York').format('YYYY-MM-DD-HH:mm'),
    totalAmount: 0,
    subtotal: 0,
  };

  const [cartData, setCartData] = useState(initialCartData);
  const [userInfo, setUserInfo] = useState('');

  const addItemToCart = (itemToAdd) => {
    setCartData((prevCartData) => {
      // Finding the item in the cart (if it exists)
      const existingItemIndex = prevCartData.items.findIndex(
        (item) => item.item_code === itemToAdd.item_code
      );
      const existingItem = prevCartData.items[existingItemIndex];

      let updatedItems;
      if (existingItem) {
        // Create a new item with updated amount
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        // Create a new items array with the updated item
        updatedItems = [...prevCartData.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // Add a new item to the cart
        updatedItems = [
          ...prevCartData.items,
          { ...itemToAdd, quantity: 1 },
        ];
      }

      // Calculate new subtotal, tax, totalAmount, and total
      let newSubtotal = 0;
      let newTotalAmount = 0;

      updatedItems.forEach((item) => {
        newSubtotal += item.price * item.quantity;
        newTotalAmount += item.quantity;
      });

      return {
        ...prevCartData,
        items: updatedItems,
        subtotal: newSubtotal,
        totalAmount: newTotalAmount,
      };
    });
  };

  //minus quantity from shopping cart
  const subItemToCart = (itemToSubtract) => {
    setCartData((prevCartData) => {
      const existingItemIndex = prevCartData.items.findIndex(
        (item) => item.item_code === itemToSubtract.item_code
      );
      const existingItem = prevCartData.items[existingItemIndex];

      let updatedItems = [...prevCartData.items];

      if (existingItem && existingItem.quantity > 1) {
        // If the item exists and its quantity is greater than 1, decrease the quantity
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      } else if (existingItem && existingItem.quantity === 1) {
        // If the item exists and its quantity is 1, remove it from the cart
        updatedItems.splice(existingItemIndex, 1);
      }

      // Recalculate subtotal, tax, totalAmount, and total
      let newSubtotal = 0;
      let newTotalQuantity = 0;
      updatedItems.forEach((item) => {
        newSubtotal += item.price * item.quantity;
        newTotalQuantity += item.quantity;
      });

      return {
        ...prevCartData,
        items: updatedItems,
        subtotal: newSubtotal,
        totalAmount: newTotalQuantity,
      };
    });
  };

  return (
    <CheckOutContent.Provider
      value={{
        cartData,
        userInfo,
        setCartData,
        setUserInfo,
        initialCartData,
        addItemToCart,
        subItemToCart,
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="category/:id" element={<Listing />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="admin" element={<Admin />} />
                  <Route
                    path="admin/clients"
                    element={<AdminClients />}
                  ></Route>
                  <Route
                    path="admin/products"
                    element={<AdminProducts />}
                  />
                  <Route
                    path="admin/notice"
                    element={<AdminBanner />}
                  />
                  <Route path="admin/test" element={<Testing />} />
                </Routes>
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/forget-password"
            element={<ForgetPassword />}
          />
        </Routes>
      </Router>
    </CheckOutContent.Provider>
  );
}

export default App;
