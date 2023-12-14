import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import moment from 'moment-timezone';
import CheckOutContent from './store/CheckOutContent';
import Missing from './Pages/Missing';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Listing from './Components/Listing/Listing';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import { message } from 'antd';
import Contact from './Pages/Contact';
import Admin from './Pages/Admin';

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
    tax: 0,
    total: 0,
    casher: localStorage.getItem('username'),
    method: 'supplier',
    total_cost: 0,
    profit: 0,
  };

  const [cartData, setCartData] = useState(initialCartData);

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
          amount: existingItem.amount + 1,
        };
        // Create a new items array with the updated item
        updatedItems = [...prevCartData.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // Add a new item to the cart
        updatedItems = [
          ...prevCartData.items,
          { ...itemToAdd, amount: 1 },
        ];
      }

      // Calculate new subtotal, tax, totalAmount, and total
      let newSubtotal = 0;
      let newTax = 0;
      let newTotalAmount = 0;
      let newTotal_cost = 0;

      updatedItems.forEach((item) => {
        newSubtotal += item.price * item.amount;
        newTax += item.price * item.amount * 0.07; // Assuming a 7% tax rate
        newTotalAmount += item.amount;
        newTotal_cost += item.cost * 1;
      });

      let newTotal = newSubtotal + newTax;
      let newProfit = newSubtotal - newTotal_cost;

      return {
        ...prevCartData,
        items: updatedItems,
        subtotal: newSubtotal,
        tax: newTax,
        totalAmount: newTotalAmount,
        total: newTotal,
        total_cost: newTotal_cost,
        profit: newProfit,
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

      if (existingItem && existingItem.amount > 1) {
        // If the item exists and its amount is greater than 1, decrease the amount
        updatedItems[existingItemIndex] = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
      } else if (existingItem && existingItem.amount === 1) {
        // If the item exists and its amount is 1, remove it from the cart
        updatedItems.splice(existingItemIndex, 1);
      }

      // Recalculate subtotal, tax, totalAmount, and total
      let newSubtotal = 0;
      let newTax = 0;
      let newTotalAmount = 0;

      updatedItems.forEach((item) => {
        newSubtotal += item.price * item.amount;
        newTax += item.price * item.amount * 0.07; // Assuming a 7% tax rate
        newTotalAmount += item.amount;
      });

      let newTotal = newSubtotal + newTax;

      return {
        ...prevCartData,
        items: updatedItems,
        subtotal: newSubtotal,
        tax: newTax,
        totalAmount: newTotalAmount,
        total: newTotal,
      };
    });
  };

  //remove this item from shopping cart
  const removeItemToCart = (item, taxFree) => {
    const newCart = { ...cartData };
    const index = cartData.items.indexOf(item);
    if (cartData.items.indexOf(item) === -1) {
      console.log(`item doesn't appear`);
    }
    if (!taxFree) {
      let item_tax = item.price * 0.07 * item.amount;
      let item_subtotal = item.price * item.amount;
      let item_total = item_tax + item_subtotal;
      newCart.tax -= item_tax;
      newCart.subtotal -= item_subtotal;
      newCart.totalAmount -= item.amount;
      newCart.total -= item_total;
      newCart.items.splice(index, 1);
      setCartData(newCart);
    } else {
      let item_tax = item.price * 0.07 * item.amount;
      let item_subtotal = item.price * item.amount;
      newCart.subtotal -= item_subtotal;
      newCart.totalAmount -= item.amount;
      newCart.tax -= item_tax;
      newCart.total -= item_subtotal + item_tax;
      newCart.items.splice(index, 1);
      setCartData(newCart);
    }
  };

  return (
    <CheckOutContent.Provider
      value={{
        cartData,
        setCartData,
        initialCartData,
        addItemToCart,
        subItemToCart,
        removeItemToCart,
      }}
    >
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/category/:id" element={<Listing />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </Router>
      </div>
    </CheckOutContent.Provider>
  );
}

export default App;
