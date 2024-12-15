import './Home.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth'

function HomePage() {
  const auth = getAuth();
  const user = auth.currentUser
  const [hotels, setHotels] = useState([]);
  const logoutHandler = () => {
    signOut(getAuth())
      .then(()=> alert("user logout successful"))
      .catch((e)=> alert(e.error))
  }

  useEffect(() => {
    const fetchHotels = async () => {
      const querySnapshot = await getDocs(collection(db, 'hotels'));
      const hotelsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHotels(hotelsList);
    };
    fetchHotels();
  }, []);

  return (
    <div className="homeContainer">
      <nav className='nav'>
        <h1>TashkentStay</h1>
        <button onClick={logoutHandler}>
          <p>{user.email} dan chiqish</p>
        </button>
      </nav>
      <div className="hotelsGrid">
        {hotels.map((hotel) => (
          <Link to={`/hotel/${hotel.id}`} className="hotelLink">
          <div
            key={hotel.id}
            className="hotelCard"
            style={{ backgroundImage: `url(${hotel.image})` }} 
          > 
              <div className="hotelInfo">
                <h2>{hotel.name || 'Hotel nomi mavjud emas'}</h2>
                <p>{hotel.address}</p>
              </div>
          </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
