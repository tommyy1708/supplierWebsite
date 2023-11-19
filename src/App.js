import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import CheckOutContent from './store/CheckOutContent';
import  Missing  from './Pages/Missing';
import Login from './Pages/Login'
import Home from './Pages/Home';
import Listing from './Components/Listing/Listing';
function App() {
  return (
    <CheckOutContent.Provider value={{}}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/category/:id" element={<Listing />} />
            </Route>
            <Route path="*" element={<Missing />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </CheckOutContent.Provider>
  );
}

export default App;
