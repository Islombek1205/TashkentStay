import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import HotelPage from './pages/hotelPage/HotelPage'; 
import './firebase/config';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return findOut;
  }, [auth]);

  return (
    <div className="app">
      <Router>
        <Routes>
          {!isLogged && <Route path="/" element={<Register />} />}

          {isLogged && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/hotel/:hotelId" element={<HotelPage />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
