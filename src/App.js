import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import CheckOutContent from './store/CheckOutContent';
import Missing from './Pages/Missing';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Listing from './Components/Listing/Listing';
import Profile from './Pages/Profile';
function App() {
  return (
    <CheckOutContent.Provider value={{}}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/category/:id" element={<Listing />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </Router>
      </div>
    </CheckOutContent.Provider>
  );
}

export default App;
